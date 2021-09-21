let  url = "http://localhost:3000";

export const postAuth = async (objValue:any) => {
    const data = await fetch(`${url}/api/auth`,{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(objValue)}

    )
    console.log(data);

    return data
}