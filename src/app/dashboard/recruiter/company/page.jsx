import React from 'react';
import CompanyPage from './CompanyPage';
import { getUserSession } from '@/lib/core/session';
import { getRecruiterCompany } from '@/lib/api/companies';

const CompanyPageRegistration = async() => {
    const user = await getUserSession()
    const company = getRecruiterCompany(user?.id)
   
    return (
        <div>
           <CompanyPage recruiter={user} recruiterCompany={company}></CompanyPage>
        </div>
    );
};

export default CompanyPageRegistration;