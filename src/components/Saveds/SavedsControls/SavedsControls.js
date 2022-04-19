import React from 'react';

import './SavedsControls.css';

const savedsControl = (props) => {
  return (
    <div className='saveds-control'>
      <h2>Your Saved Jobs</h2>
      {/* <button
        className={props.activeOutputType === 'list' ? 'active' : ''}
        onClick={props.onChange.bind(this, 'list')}
      >
        List
      </button> */}
      {/* <button
        className={props.activeOutputType === 'chart' ? 'active' : ''}
        onClick={props.onChange.bind(this, 'chart')}
      >
        Chart
      </button> */}
    </div>
  );
};

export default savedsControl;
