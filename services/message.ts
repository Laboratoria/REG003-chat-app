interface MessageProps {
    content: string;
    channelId: number;
    uid: number;
}
const url = "http://localhost:3000";

export const postMessage = (token: string, payload: MessageProps) => fetch(`${url}/api/channel/${payload.channelId}/messages`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authentication': 'Bearer ' + `${token}`
    },
    body: JSON.stringify(payload)
}
).then(response => response.json())
    .then(data => data)
    .catch(err => 'error')


export const getChannelMessages = (token: string, channelId: number) => fetch(`${url}/api/channel/${channelId}/messages`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authentication': `Bearer ${token}`
    },
}
).then(response => response.json())
    .then(data => data)
    .catch(err => 'error')
