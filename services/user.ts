let url = "http://localhost:3000";
export const postUser = async (objValue: any) => fetch(`${url}/api/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(objValue)
}
).then(response => response.json())
.then(data => console.log(data))
.catch(err=> console.error(err))