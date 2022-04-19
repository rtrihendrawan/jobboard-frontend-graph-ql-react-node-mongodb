import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthPage from './pages/Auth';
import SavedsPage from './pages/Saveds';
import JobsPage from './pages/Jobs';
import AddJobPage from './pages/AddJobPage';
import JobItem from './pages/JobItem';
import AboutPage from './pages/AboutPage';
import MainNavigation from './components/Navigation/MainNavigation';
import Footer from './components/Navigation/Footer';
import AuthContext from './context/auth-context';

import './App.css';

class App extends Component {
  state = {
    token: null,
    userId: null,
    email: null,
  };

  login = (token, userId, email, tokenExpiration) => {
    this.setState({ token: token, userId: userId, email: email });
  };

  logout = () => {
    this.setState({ token: null, userId: null, email: null });
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              email: this.state.email,
              login: this.login,
              logout: this.logout,
            }}
          >
            <MainNavigation />
            <main className='main-content'>
              <Switch>
                <Redirect
                  from='/portfolio/job-board-graphql/'
                  to='/portfolio/job-board-graphql/jobs'
                  exact
                />
                {this.state.token && (
                  <Redirect
                    from='/portfolio/job-board-graphql/auth'
                    to='/portfolio/job-board-graphql/jobs'
                    exact
                  />
                )}
                {!this.state.token && (
                  <Route
                    path='/portfolio/job-board-graphql/auth'
                    component={AuthPage}
                  />
                )}
                {this.state.token && (
                  <Route
                    path='/portfolio/job-board-graphql/job/add'
                    component={AddJobPage}
                  />
                )}
                <Route
                  path='/portfolio/job-board-graphql/jobs'
                  component={JobsPage}
                />
                <Route
                  path='/portfolio/job-board-graphql/job/:jobId'
                  component={JobItem}
                  exact
                />
                <Route
                  path='/portfolio/job-board-graphql/about'
                  component={AboutPage}
                  exact
                />

                {this.state.token && (
                  <Route
                    path='/portfolio/job-board-graphql/saveds'
                    component={SavedsPage}
                  />
                )}
                {!this.state.token && (
                  <Redirect to='/portfolio/job-board-graphql/auth' exact />
                )}
              </Switch>
            </main>
            <Footer />
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
