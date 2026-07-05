
import JobsTable from '@/components/recruiter/JobsTable';
import { getCompanyJob } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';

const RecruiterJobs = async() => {  
        const user = await getUserSession()
        console.log(user, "/line-8-recruiter/job")
        const recruiterId = user?.id;
        const jobs_res = await getCompanyJob(recruiterId);
        console.log(jobs_res,'line-11/rec/job')
     
 

  return (
   <div>
    <JobsTable jobs ={jobs_res}></JobsTable>
   </div>
  );
};

export default RecruiterJobs;