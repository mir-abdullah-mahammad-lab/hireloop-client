import JobDetailsView from '@/components/job/JobDetailsView';
import { getJobsById } from '@/lib/api/jobs';
import React from 'react';

const JobDetailsPage = async ({ params }) => {
    const { id } = await params
    //   console.log(id, 'SHAPE OF THE PARAMS TO KNWO BETTER')
    const job = await getJobsById(id)
    console.log(job, 'data from the backend mongodb server')

    return (
        <div>
            <JobDetailsView job={job}></JobDetailsView>
        </div>
    );
};

export default JobDetailsPage;