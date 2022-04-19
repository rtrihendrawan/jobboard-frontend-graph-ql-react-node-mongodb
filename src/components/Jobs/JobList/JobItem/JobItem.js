import React from 'react';
import { Link } from 'react-router-dom';
import './JobItem.css';

const jobItem = (props) => (
  <li key={props.jobId} className='jobs__list-item'>
    <div className='list__heading'>
      <h1>
        <Link to={`/portfolio/job-board-graphql/job/${props.jobId}`}>
          {props.title}
        </Link>
      </h1>
      <h2>
        {props.wage} - {new Date(props.date).toLocaleDateString()}
      </h2>
    </div>
    <div className='list__links'>
      {props.userId === props.creatorId ? (
        <Link
          className='eric-button transparent'
          to={`/portfolio/job-board-graphql/job/${props.jobId}`}
        >
          You Posted This
        </Link>
      ) : (
        <Link
          className='text-white eric-button'
          to={`/portfolio/job-board-graphql/job/${props.jobId}`}
        >
          View Job Details
        </Link>
      )}
    </div>
  </li>
);

export default jobItem;
