let  url = "http://localhost:3000";

export const postAuth = async (objValue:any) => {
    console.log(url);
    console.log(objValue);
    
    
    const data = await fetch(`${url}/api/auth`,{
        method:'POST',
        body:objValue 
    })

    console.log(data);
    

    return data 
}