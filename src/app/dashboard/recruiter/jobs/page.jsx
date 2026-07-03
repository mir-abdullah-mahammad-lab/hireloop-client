
import JobsTable from '@/components/recruiter/JobsTable';
import { getCompanyJob } from '@/lib/api/jobs';

const RecruiterJobs = async() => {  
        const companyId = "Acme-Corp";
        const jobs_res = await getCompanyJob(companyId);
        console.log(jobs_res,'bingooooo')
     
 

  return (
   <div>
    <JobsTable jobs ={jobs_res}></JobsTable>
   </div>
  );
};

export default RecruiterJobs;