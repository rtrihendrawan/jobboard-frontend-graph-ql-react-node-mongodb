import React, { Component } from 'react';
// import { useParams } from 'react-router-dom';

// import Modal from '../components/Modal/Modal';
// import Backdrop from '../components/Backdrop/Backdrop';
import JobSingleList from '../components/Jobs/JobList/JobSingleList';
import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/auth-context';
import './Jobs.css';

class JobItemPage extends Component {
  state = {
    creating: false,
    jobs: [],
    isLoading: false,
    selectedJob: null,
  };
  isActive = true;

  static contextType = AuthContext;

  componentDidMount() {
    this.fetchJobs();
  }

  startCreateJobHandler = () => {
    this.setState({ creating: true });
  };

  fetchJobs() {
    this.setState({ isLoading: true });

    const { jobId } = this.props.match.params;

    const requestBody = {
      query: `
          query {
            jobItem(jobId: "${jobId}") {
              _id
              title
              description
              date
              wage
              creator {
                _id
                email
              }
            }
          }
        `,
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/graphql`, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed: ' + res.status);
        }
        return res.json();
      })
      .then((resData) => {
        const job = resData.data.jobItem;

        if (this.isActive) {
          this.setState({
            jobs: [job],
            selectedJob: job._id,
            isLoading: false,
          });
        }
      })
      .catch((err) => {
        console.log('err:', err);
        if (this.isActive) {
          this.setState({ isLoading: false });
        }
      });
  }

  savedJobHandler = (jobId) => {
    if (!this.context.token) {
      this.setState({ selectedJob: null });
      return;
    }
    this.setState({ selectedJob: jobId });

    const requestBody = {
      query: `
          mutation SavedJob($id: ID!) {
            savedJob(jobId: $id) {
              _id
             createdAt
             updatedAt
            }
          }
        `,
      variables: {
        id: jobId,
      },
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/graphql`, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.context.token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then((resData) => {
        this.setState({ selectedJob: null });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentWillUnmount() {
    this.isActive = false;
  }

  render() {
    return (
      <React.Fragment>
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <JobSingleList
            jobs={this.state.jobs}
            authUserId={this.context.userId}
            onViewDetail={this.showDetailHandler}
            onSaved={this.savedJobHandler}
          />
        )}
      </React.Fragment>
    );
  }
}

export default JobItemPage;
