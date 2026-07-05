import { getJobs } from '@/lib/api/jobs';
import JobsView from '@/components/job/Jobview';


export default async function Page() {
    const jobs = await getJobs();
    
    return <JobsView initialJobs={jobs} />;
}