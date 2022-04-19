import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

// import AuthContext from '../../context/auth-context';
import AuthContext from '../../context/auth-context';
import './MainNavigation.css';

class mainNavigation extends Component {
  // state = {
  //   currentMobileMenu: '',
  // };

  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {}

  componentDidUpdate() {
    this.closeMobileMenuHandler();
  }

  componentWillUnmount() {}

  toggleMobileMenuHandler() {
    const el = document.getElementById('site-mobile-menu-toggle');
    const el2 = document.getElementById('site-navigation');

    if (!el.classList.contains('eric-open')) {
      el.classList.add('eric-open');
      el2.classList.add('eric-open');
    } else {
      el.classList.remove('eric-open');
      el2.classList.remove('eric-open');
    }
  }
  closeMobileMenuHandler() {
    const el = document.getElementById('site-mobile-menu-toggle');
    const el2 = document.getElementById('site-navigation');

    el.classList.remove('eric-open');
    el2.classList.remove('eric-open');
  }

  render() {
    return (
      <AuthContext.Consumer>
        {(context) => {
          return (
            <section id='site-header-2022'>
              <div id='site-header-inner'>
                <header style={{ left: '0px' }}>
                  <Link to='/portfolio/job-board-graphql/' id='site-logo'>
                    <svg
                      fill='#181818'
                      viewBox='0 0 100 100'
                      className='svg-icon size-med icon-cloud-arrow-up'
                    >
                      <use xlinkHref='#icon-cloud-arrow-up' />
                    </svg>
                    JobsboardApp
                  </Link>

                  <nav id='site-navigation'>
                    <ul id='site-primary-menu' className='menu'>
                      <li className='current-menu-parent menu-item-has-children'>
                        <NavLink to='/portfolio/job-board-graphql/jobs'>
                          <span>Jobs List</span>
                        </NavLink>
                      </li>
                      {!context.token && (
                        <li
                          className='current-menu-parent menu-item-has-children'
                          style={{ position: 'relative', paddingLeft: '30px' }}
                        >
                          <svg
                            class='svg-icon icon-user'
                            style={{
                              position: 'absolute',
                              left: '20px',
                              top: '28px',
                            }}
                          >
                            <use xlinkHref='#icon-user' />
                          </svg>
                          <NavLink to='/portfolio/job-board-graphql/auth'>
                            <span>Login / Signup</span>
                          </NavLink>
                        </li>
                      )}

                      {context.token && (
                        <React.Fragment>
                          <li className='current-menu-parent menu-item-has-children eric-active'>
                            <NavLink to='/portfolio/job-board-graphql/saveds'>
                              Saved Jobs
                            </NavLink>
                          </li>
                          <li className='current-menu-parent menu-item-has-children eric-active'>
                            <NavLink to='/portfolio/job-board-graphql/job/add'>
                              Add New Job Opening
                            </NavLink>
                          </li>
                          <li
                            className='menu-item menu-item-type-post_type menu-item-object-page'
                            style={{
                              position: 'relative',
                              paddingLeft: '30px',
                            }}
                          >
                            <svg
                              class='svg-icon icon-user'
                              style={{
                                position: 'absolute',
                                left: '20px',
                                top: '28px',
                              }}
                            >
                              <use xlinkHref='#icon-user' />
                            </svg>
                            <NavLink
                              to={`/portfolio/job-board-graphql/#${context.token}`}
                              data-token-length={context.token.length}
                              title={`You are logged-in as user ${context.email}`}
                            >
                              <span>You</span>
                            </NavLink>
                          </li>
                          {context.token && (
                            <li className='current-menu-parent menu-item-has-children'>
                              <button
                                className='btn transparent'
                                onClick={context.logout}
                              >
                                <span>Logout</span>
                              </button>
                            </li>
                          )}
                        </React.Fragment>
                      )}
                    </ul>
                    <div id='site-mobile-menu-toggle'>
                      <span className='eric-screen-reader-text'>Menu</span>
                      <div
                        className='mobile__button'
                        onClick={this.toggleMobileMenuHandler}
                      >
                        <span />
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                    <div id='site-mobile-menu' />

                    <ul id='site-secondary-menu' className='menu'>
                      <li className='eric-search'>
                        <span className='eric-search-open'>
                          <span className='fas fa-search'>
                            <svg
                              viewBox='0 0 100 100'
                              className='svg-icon search'
                            >
                              <use xlinkHref='#icon-search' />
                            </svg>
                          </span>
                        </span>
                        <span className='eric-search-close'>
                          <span className='fas fa-times' />
                        </span>
                        <form
                          action='/portfolio/job-board-graphql/'
                          className='searchform eric-form'
                          id='searchform-0'
                          method='get'
                          role='search'
                          noValidate='novalidate'
                        >
                          <div>
                            <label
                              className='eric-screen-reader-text'
                              htmlFor='s-0'
                            >
                              Search
                            </label>
                            <input
                              id='s-0'
                              name='s'
                              placeholder='Search'
                              type='text'
                            />
                            <button
                              id='searchsubmit-0'
                              title='Search'
                              type='submit'
                            >
                              <span className='fas fa-search' />
                            </button>
                          </div>
                        </form>
                      </li>
                      <li className='menu-item menu-item-type-custom menu-item-object-custom menu-item-38'>
                        {!context.token && (
                          <Link
                            to='/portfolio/job-board-graphql/auth'
                            className='eric-button eric-button-white'
                          >
                            <span>Post A New Job</span>
                          </Link>
                        )}
                        {context.token && (
                          <button
                            className='eric-button eric-button-transparent'
                            onClick={context.logout}
                          >
                            <span>Logout</span>
                          </button>
                        )}
                      </li>
                      <li className='menu-item menu-item-type-post_type menu-item-object-page menu-item-40'>
                        {context.token && (
                          <Link
                            to='/portfolio/job-board-graphql/job/add'
                            className='eric-button eric-button-white'
                          >
                            <span>Post A New Job</span>
                          </Link>
                        )}
                      </li>
                    </ul>
                  </nav>
                </header>
              </div>
            </section>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}

export default mainNavigation;
