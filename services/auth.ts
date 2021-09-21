let  url = "http://localhost:3000";

export const postAuth = async (objValue:any) => fetch(`${url}/api/auth`,{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(objValue)}

    ).then(response => response.json())
    .then(data => console.log(data));



