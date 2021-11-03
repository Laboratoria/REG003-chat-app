const url = 'http://localhost:3000';
// const secretKey = process.env.SECRET_KEY_DEV || 'holaMundo';


export const getUserChannels = async (token: string, uid: number) => {

    const userChannelsService = await fetch(`${url}/api/user/${uid}/channels`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authentication': 'Bearer ' + `${token}`

        }
    })
    const data = await userChannelsService.json();
    return data;
}

export const getChannelsToDiscover = async (token: string, uid: number) => {

    const userChannelsService = await fetch(`${url}/api/user/${uid}/discover-channel`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authentication': 'Bearer ' + `${token}`

        }
    })
    const data = await userChannelsService.json();
    return await data;
}

export const getAllChannels = async (token: string) => {

    const allChannelsService = await fetch(`${url}/api/channel`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const data = await allChannelsService.json();
    return await data;
}

export const getChannelById = (token: string, channelId: number) => {
    const channelByIdService = fetch(`${url}/api/channel/${channelId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + `${token}`
        }
    }).then(response => response.json())
        .then(data => data)
        .catch(err => 'error')
    return channelByIdService
}