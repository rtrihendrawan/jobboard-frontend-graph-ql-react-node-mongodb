import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import JobList from '../components/Jobs/JobList/JobList';
import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/auth-context';
import './Jobs.css';

class JobsPage extends Component {
  state = {
    creating: false,
    jobs: [],
    isLoading: false,
    selectedJob: null,
  };
  isActive = true;

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.titleElRef = React.createRef();
    this.wageElRef = React.createRef();
    this.dateElRef = React.createRef();
    this.descriptionElRef = React.createRef();
  }

  componentDidMount() {
    this.fetchJobs();
  }

  startCreateJobHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = () => {
    this.setState({ creating: false });
    const title = this.titleElRef.current.value;
    const wage = this.wageElRef.current.value;
    const date = this.dateElRef.current.value;
    const description = this.descriptionElRef.current.value;

    if (
      title.trim().length === 0 ||
      wage.trim().length === 0 ||
      date.trim().length === 0 ||
      description.trim().length === 0
    ) {
      return;
    }

    const job = { title, wage, date, description };
    // console.log(job);

    const requestBody = {
      query: `
          mutation CreateJob($title: String!, $desc: String!, $wage: String!, $date: String!) {
            createJob(jobInput: {title: $title, description: $desc, wage: $wage, date: $date}) {
              _id
              title
              description
              date
              wage
            }
          }
        `,
      variables: {
        title: title,
        desc: description,
        wage: wage,
        date: date,
      },
    };

    const token = this.context.token;

    fetch(`${process.env.REACT_APP_BACKEND_URL}/graphql`, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then((resData) => {
        this.setState((prevState) => {
          const updatedJobs = [...prevState.jobs];
          updatedJobs.push({
            _id: resData.data.createJob._id,
            title: resData.data.createJob.title,
            description: resData.data.createJob.description,
            date: resData.data.createJob.date,
            wage: resData.data.createJob.wage,
            creator: {
              _id: this.context.userId,
            },
          });
          return { jobs: updatedJobs };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false, selectedJob: null });
  };

  fetchJobs() {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query {
            jobs {
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
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then((resData) => {
        const jobs = resData.data.jobs;
        if (this.isActive) {
          this.setState({ jobs: jobs, isLoading: false });
        }
      })
      .catch((err) => {
        console.log(err);
        if (this.isActive) {
          this.setState({ isLoading: false });
        }
      });
  }

  showDetailHandler = (jobId) => {
    this.setState((prevState) => {
      const selectedJob = prevState.jobs.find((e) => {
        return e._id === jobId;
      });

      return { selectedJob: selectedJob };
    });
  };

  savedJobHandler = () => {
    if (!this.context.token) {
      this.setState({ selectedJob: null });
      return;
    }

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
        id: this.state.selectedJob._id,
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
        {(this.state.creating || this.state.selectedJob) && (
          <Backdrop onCancel={this.modalCancelHandler} />
        )}
        {this.state.creating && (
          <Modal
            title='Add Job'
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
            confirmText='Confirm'
            className='show'
          >
            <form>
              <div className='form-control'>
                <label htmlFor='title'>Title</label>
                <input type='text' id='title' ref={this.titleElRef} />
              </div>
              <div className='form-control'>
                <label htmlFor='date'>Date</label>
                <input type='datetime-local' id='date' ref={this.dateElRef} />
              </div>
              <div className='form-control'>
                <label htmlFor='description'>Description</label>
                <textarea
                  id='description'
                  rows='4'
                  ref={this.descriptionElRef}
                />
              </div>
              <div className='form-control'>
                <label htmlFor='wage'>Salary</label>
                <input type='text' id='wage' ref={this.wageElRef} />
              </div>
            </form>
          </Modal>
        )}
        {this.state.selectedJob && (
          <Modal
            title={this.state.selectedJob.title}
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.savedJobHandler}
            confirmText={
              this.context.token ? 'Save Job' : 'Login / Signup to Save'
            }
            className='show'
          >
            <h1>{this.state.selectedJob.title}</h1>
            <h2>
              {this.state.selectedJob.wage} -{' '}
              {new Date(this.state.selectedJob.date).toLocaleDateString()}
            </h2>
            <p>{this.state.selectedJob.description}</p>
          </Modal>
        )}
        {this.context.token && (
          <div className='jobs-control'>
            <p>List Your New Job Opening Here!</p>
            <Link
              to='/portfolio/job-board-graphql/job/add'
              className='text-white eric-button'
            >
              Add Job Opening
            </Link>
          </div>
        )}
        {!this.context.token && (
          <div className='jobs-control'>
            <p>List Your New Job Opening Here!</p>
            <Link
              to='/portfolio/job-board-graphql/auth'
              className='text-white eric-button'
            >
              Signup / Login to Add Job Opening
            </Link>
          </div>
        )}
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <JobList
            jobs={this.state.jobs}
            authUserId={this.context.userId}
            onViewDetail={this.showDetailHandler}
          />
        )}
      </React.Fragment>
    );
  }
}

export default JobsPage;
