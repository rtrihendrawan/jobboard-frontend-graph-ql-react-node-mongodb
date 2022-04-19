import React, { Component } from 'react';
// import { history } from '';

import AuthContext from '../context/auth-context';
import './Jobs.css';

class JobsPage extends Component {
  state = {
    creating: true,
    jobs: [],
    isLoading: false,
    selectedJob: null,
  };
  isActive = true;

  history(path) {
    this.props.history.push(path);
  }

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.titleElRef = React.createRef();
    this.wageElRef = React.createRef();
    this.dateElRef = React.createRef();
    this.descriptionElRef = React.createRef();
  }

  componentDidMount() {
    // this.fetchJobs();
    // this.modalConfirmHandler();
  }

  startCreateJobHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = (e) => {
    e.preventDefault();

    // this.setState({ creating: false });
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
          this.history('/jobs');

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

  componentWillUnmount() {
    this.isActive = false;
  }

  render() {
    return (
      <React.Fragment>
        {this.state.creating && (
          <div
            className='job__page'
            // title='Add Job'
            // onCancel={this.modalCancelHandler}
            // onConfirm={this.modalConfirmHandler}
            // confirmText='Confirm'
            // className='show'
          >
            <form onSubmit={this.modalConfirmHandler}>
              <h1>Add New Job Opening</h1>
              <div className='form-control'>
                <label htmlFor='title'>Title*</label>
                <input type='text' id='title' ref={this.titleElRef} />
              </div>
              <div className='form-control'>
                <label htmlFor='date'>Date*</label>
                <input type='date' id='date' ref={this.dateElRef} />
              </div>
              <div className='form-control'>
                <label htmlFor='description'>Job Description*</label>
                <textarea
                  id='description'
                  rows='18'
                  ref={this.descriptionElRef}
                />
              </div>
              <div className='form-control'>
                <label htmlFor='wage'>Salary*</label>
                <input type='text' id='wage' ref={this.wageElRef} />
              </div>
              <button className='text-white eric-button' type='submit'>
                Submit
              </button>
            </form>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default JobsPage;
