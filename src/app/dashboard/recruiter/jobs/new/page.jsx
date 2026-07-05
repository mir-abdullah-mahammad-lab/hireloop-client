import React from 'react';
import PostJobForm from './PostJobForm';
import { getLoggedInRecruiterCompany } from '@/lib/api/companies';
import { getUserSession } from '@/lib/core/session';

const PostJobPage = async() => {
    const company = await getLoggedInRecruiterCompany();
    const user = await getUserSession()
    return (
        <div>
            <PostJobForm companyOfUser={company} user={user}></PostJobForm>
        </div>
    );
};

export default PostJobPage;