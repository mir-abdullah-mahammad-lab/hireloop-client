import { serverFetch } from "../core/server";

const baseUrl = process.env.PUBLIC_BASE_URL;
export const getCompanyJob =  async (recruiterId)=>{
    const res = await fetch(`${baseUrl}/api/jobs?recruiterId=${recruiterId}`)
    const d = await res.json()
    return d  
}

export const getJobs = async ()=>{
    return serverFetch(`/api/jobs`)
}