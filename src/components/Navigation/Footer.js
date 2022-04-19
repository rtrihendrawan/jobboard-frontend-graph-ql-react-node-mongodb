import React from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/auth-context';

const Footer = (props) => (
  <AuthContext.Consumer>
    {(context) => {
      return (
        <section id='site-footer' style={{ marginBottom: '-1em' }}>
          <footer>
            <div className='eric-row'>
              <div id='site-footer-menu-wrapper' className='eric-col-md-9'>
                <ul id='site-footer-menu' className='menu'>
                  <li className='menu-item menu-item-type-post_type menu-item-object-page'>
                    <Link to='/portfolio/job-board-graphql/jobs'>
                      Jobs List
                    </Link>
                  </li>
                  {context.token && (
                    <li className='menu-item menu-item-type-post_type menu-item-object-page'>
                      <Link to='/portfolio/job-board-graphql/saveds'>
                        Your Saved Jobs
                      </Link>
                    </li>
                  )}
                  <li className='menu-item menu-item-type-post_type menu-item-object-page'>
                    {!context.token && (
                      <Link to='/portfolio/job-board-graphql/auth'>
                        Login / Signup
                      </Link>
                    )}
                    {context.token && (
                      <Link to='/portfolio/job-board-graphql/job/add'>
                        Post New Job Opening
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
              <div className='eric-col-md-3'>
                <ul id='site-social-menu' className='menu'>
                  <li className='fab fa-twitter menu-item menu-item-type-custom menu-item-object-custom menu-item-27'>
                    <a
                      title='Twitter'
                      target='_blank'
                      rel='noopener noreferrer'
                      href='https://twitter.com'
                    >
                      Twitter
                    </a>
                  </li>
                  <li className='fab fa-linkedin-in menu-item menu-item-type-custom menu-item-object-custom menu-item-28'>
                    <a
                      title='LinkedIn'
                      target='_blank'
                      rel='noopener noreferrer'
                      href='https://www.linkedin.com'
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li className='fab fa-facebook-f menu-item menu-item-type-custom menu-item-object-custom menu-item-29'>
                    <a
                      title='Facebook'
                      target='_blank'
                      rel='noopener noreferrer'
                      href='https://www.facebook.com'
                    >
                      Facebook
                    </a>
                  </li>
                </ul>
              </div>
              <div className='eric-col-xs-12' id='site-copyright'>
                <p>
                  ©2022 JobBoard App &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp;
                  <Link to='/portfolio/job-board-graphql/'>Privacy Policy</Link>
                  &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp;
                  <Link to='/portfolio/job-board-graphql/about'>About App</Link>
                </p>
              </div>
            </div>
          </footer>
        </section>
      );
    }}
  </AuthContext.Consumer>
);

export default Footer;
