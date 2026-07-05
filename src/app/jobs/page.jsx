import JobCard from '@/components/job/JobCard';
import { getJobs } from '@/lib/api/jobs';
import React from 'react';

const JobsView = async () => {
    const jobs = await getJobs()
    // console.log(jobs, 'all the jobs form the backend')
    return (
        <div className='grid grid-cols-3 gap-3 p=3'>
            {jobs.map(j => <JobCard key={j._id} job ={j}></JobCard>)}
        </div>
    );
};

export default JobsView;