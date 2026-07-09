// const baseUrl = process.env.PUBLIC_BASE_URL
// http://localhost:5000



export const serverFetch = async(path)=>{
    const res = await fetch(`${process.env.PUBLIC_BASE_URL}${path}`)
    
    if (!res.ok) {
        throw new Error(`Server error: ${res.status} ${res.statusText}`);
    }
    
    return await res.json()
}



export const serverMutation = async(path, data)=>{
     const res = await fetch(`${process.env.PUBLIC_BASE_URL}${path}`,{
        method: 'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
     })
     return await res.json()
} 