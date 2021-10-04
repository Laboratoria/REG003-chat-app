let url = "http://localhost:3000";
//TODO: REFACTOR TO AWAIT / HANDLE ERRORS
//ASSIGN TO: VALEN

interface AuthProps {
    email: string;
    password: string;
}

export const postAuth = async (objValue: AuthProps) => fetch(`${url}/api/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(objValue)
}
).then(response => response.json())
    .then(data => data)
    .catch(err => 'error')
