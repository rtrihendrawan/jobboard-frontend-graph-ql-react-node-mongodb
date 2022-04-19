import React from 'react';

import JobSingleItem from './JobItem/JobSingleItem';
import './JobList.css';

const jobList = (props) => {
  const jobs = props.jobs.map((job) => {
    return (
      <JobSingleItem
        key={job._id}
        jobId={job._id}
        title={job.title}
        wage={job.wage}
        description={job.description}
        date={job.date}
        userId={props.authUserId}
        creatorId={job.creator._id}
        creatorEmail={job.creator.email}
        onDetail={props.onViewDetail}
        onSaved={props.onSaved}
      />
    );
  });

  return <ul className='job__list'>{jobs}</ul>;
};

export default jobList;
