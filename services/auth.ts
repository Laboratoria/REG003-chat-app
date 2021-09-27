<<<<<<< Updated upstream
let url = "http://localhost:3000";
//TODO: REFACTOR TO AWAIT / HANDLE ERRORS
//ASSIGN TO: VALEN
export const postAuth = async (objValue: any) => fetch(`${url}/api/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(objValue)
}
).then(response => response.json())
.then(data => console.log(data))
.catch(err=> console.error(err))
=======
let  url = "http://localhost:3000/api";

export const postAuth = async (objValue:any) => {

    console.log('LINE5', objValue.email);
    console.log('LINE6', objValue.password);
    
    
    const data = await fetch(`api/auth`,{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(objValue)
    })

    console.log(data);
    

    return data 
}
>>>>>>> Stashed changes
