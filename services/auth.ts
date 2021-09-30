let url = "http://localhost:3000";
//TODO: REFACTOR TO AWAIT / HANDLE ERRORS
//ASSIGN TO: VALEN
export const postAuth = async (objValue: any) => fetch(`${url}/api/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(objValue)
}
).then(response => response.json())
.then(data => data)
.catch(err=>'error')
