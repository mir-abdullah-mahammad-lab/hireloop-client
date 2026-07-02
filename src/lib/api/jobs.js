
const baseUrl = process.env.PUBLIC_BASE_URL;
export const getCompanyJob =  async (companyId, status='active')=>{
    const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`)
    const d = await res.json()
    return d  
}