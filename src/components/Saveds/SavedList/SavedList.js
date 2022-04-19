import React from 'react';

import './SavedList.css';

const savedList = (props) => (
  <ul className='saveds__list'>
    {props.saveds.map((saved) => {
      return (
        <li key={saved._id} className='saveds__item'>
          <div className='saveds__item-data'>
            {saved.job.title} - {new Date(saved.createdAt).toLocaleDateString()}
          </div>
          <div className='saveds__item-actions'>
            <button
              className='eric-button'
              onClick={props.onDelete.bind(this, saved._id)}
            >
              Remove
            </button>
          </div>
        </li>
      );
    })}
  </ul>
);

export default savedList;
