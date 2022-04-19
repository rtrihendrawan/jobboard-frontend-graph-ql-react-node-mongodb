import React from 'react';

import JobItem from './JobItem/JobItem';
import './JobList.css';

const jobList = (props) => {
  const jobs = props.jobs.map((job) => {
    return (
      <JobItem
        key={job._id}
        jobId={job._id}
        title={job.title}
        wage={job.wage}
        date={job.date}
        userId={props.authUserId}
        creatorId={job.creator._id}
        onDetail={props.onViewDetail}
      />
    );
  });

  return <ul className='job__list'>{jobs}</ul>;
};

export default jobList;
