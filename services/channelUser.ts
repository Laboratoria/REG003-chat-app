const url = 'http://localhost:3000'
export const postUserChannels = async (token: string, uid: number, channelId: number) => {

  const channelUser = await fetch(`${url}/api/user/${uid}/channels/${channelId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + `${token}`

    }
  })
  const data = await channelUser.json();
  return data;
}

export const deleteChannelUser = async (token: string, uid: number, channelId: number) => {

  const channelUser = await fetch(`${url}/api/user/${uid}/channels/${channelId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + `${token}`
    }
  })
  const data = await channelUser.json();
  return await data;
}