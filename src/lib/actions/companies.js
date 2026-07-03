'use server'

import { serverMutation } from "../core/server"

export const createCompany = async (newCompanyData) =>{
   return await serverMutation('/api/companies', newCompanyData)
}








// const baseUrl = process.env.PUBLIC_BASE_URL

// export const createCompany = async(companyData)=>{
//      const res = await fetch(`${baseUrl}/api/companies`,{
//         method: 'POST',
//         headers:{
//             "Content-Type":"application/json"
//         },
//         body:JSON.stringify(companyData)
//      })
//      return await res.json()
// } 