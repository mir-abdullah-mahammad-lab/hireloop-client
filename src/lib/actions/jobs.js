'use server'

export const  createJob = async (newJobData) =>{
   const res = await fetch(`${process.env.PUBLIC_BASE_URL}/api/jobs`,{
    method:'POST',
    headers:{
        "Content-Type" : "application/json",
    },
    body :JSON.stringify(newJobData)

   })
   return await res.json()
}