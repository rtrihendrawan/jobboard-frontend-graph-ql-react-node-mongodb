import React from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../../../context/auth-context';
import './JobItem.css';

const JobSingleItem = (props) => (
  <AuthContext.Consumer>
    {(context) => {
      return (
        <li key={props.jobId} className='jobs__list-item'>
          <div className='job__item single'>
            <h1>{props.title}</h1>
            <h2 className='wage'>{props.wage}</h2>
            <p className='date'>{new Date(+props.date).toDateString()}</p>
            <p>{props.description}</p>

            <p>
              Poster: {props.creatorId} / {props.creatorEmail}
            </p>

            {context.token && (
              <button
                className='text-white eric-button right'
                onClick={props.onSaved.bind(null, props.jobId)}
              >
                Save This Job
              </button>
            )}
            {!context.token && (
              <p>
                <Link
                  to='/portfolio/job-board-graphql/auth'
                  className='text-white eric-button right'
                >
                  Login / Signup to Save This Job
                </Link>
              </p>
            )}
          </div>
        </li>
      );
    }}
  </AuthContext.Consumer>
);

export default JobSingleItem;
