interface PostUserProps {
    email: string;
    password: string;
    username: string;
}
const url = "http://localhost:3000";

export const postUser = (objValue: PostUserProps) => fetch(`${url}/api/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(objValue)
}
).then(response => response.json())
    .then(data => data)
    .catch(err => 'error')


export const getUserByIdIOrEmail = (token: string, uid: number) => fetch(`${url}/api/channel/${uid}/messages`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + `${token}`
    },
}
).then(response => response.json())
    .then(data => data)
    .catch(err => 'error')

export const getUserById = async (token: any, uid: number) => {
    let user = await fetch(`${url}/api/user/${uid}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },

    })
    user = await user.json()
    return user;
}
