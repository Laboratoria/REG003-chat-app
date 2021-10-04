interface PostUserProps {
    email: string;
    password: string;
    username: string;
}
const url = "http://localhost:3000";

export const postUser = async (objValue: PostUserProps) => fetch(`${url}/api/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(objValue)
}
).then(response => response.json())
    .then(data => data)
    .catch(err => 'error')