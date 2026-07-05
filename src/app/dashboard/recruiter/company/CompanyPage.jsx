import RegisterCompanyForm from '@/components/recruiter/RegisterCompanyForm';


const CompanyPage =  ({recruiter, recruiterCompany}) => {
    console.log(recruiter, 'CompanyPage--------', recruiterCompany )
    return (
        <div>
            <RegisterCompanyForm recruiter={recruiter} recruiterCompany={recruiterCompany}></RegisterCompanyForm>
        </div>
    );
};

export default CompanyPage;