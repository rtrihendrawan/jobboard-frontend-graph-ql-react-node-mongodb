import React, { Component } from 'react';

import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/auth-context';
import SavedList from '../components/Saveds/SavedList/SavedList';
import SavedsChart from '../components/Saveds/SavedsChart/SavedsChart';
import SavedsControls from '../components/Saveds/SavedsControls/SavedsControls';

class SavedsPage extends Component {
  state = {
    isLoading: false,
    saveds: [],
    outputType: 'list',
  };

  static contextType = AuthContext;

  componentDidMount() {
    this.fetchSaveds();
  }

  fetchSaveds = () => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query {
            saveds {
              _id
             createdAt
             job {
               _id
               title
               date
               wage
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
        Authorization: 'Bearer ' + this.context.token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed! ' + res.json());
        }
        return res.json();
      })
      .then((resData) => {
        const saveds = resData.data.saveds;
        this.setState({ saveds: saveds, isLoading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  deleteSavedHandler = (savedId) => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          mutation CancelSaved($id: ID!) {
            cancelSaved(savedId: $id) {
            _id
             title
            }
          }
        `,
      variables: {
        id: savedId,
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
        this.setState((prevState) => {
          const updatedSaveds = prevState.saveds.filter((saved) => {
            return saved._id !== savedId;
          });
          return { saveds: updatedSaveds, isLoading: false };
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  changeOutputTypeHandler = (outputType) => {
    if (outputType === 'list') {
      this.setState({ outputType: 'list' });
    } else {
      this.setState({ outputType: 'chart' });
    }
  };

  render() {
    let content = <Spinner />;
    if (!this.state.isLoading) {
      content = (
        <React.Fragment>
          <SavedsControls
            activeOutputType={this.state.outputType}
            onChange={this.changeOutputTypeHandler}
          />
          <div>
            {this.state.outputType === 'list' ? (
              <SavedList
                saveds={this.state.saveds}
                onDelete={this.deleteSavedHandler}
              />
            ) : (
              <SavedsChart saveds={this.state.saveds} />
            )}
          </div>
        </React.Fragment>
      );
    }
    return <React.Fragment>{content}</React.Fragment>;
  }
}

export default SavedsPage;
