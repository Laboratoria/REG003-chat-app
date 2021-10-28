
import jwt from "jsonwebtoken";
import { secret } from "../config";
const url = "http://localhost:3000";
// const secretKey = process.env.SECRET_KEY_DEV || 'holaMundo';

interface getChannelsProps {
    token: string;
    cursor?: string;
    uid: number;
}

export const getUserChannels = async (token: string, uid: number) => {

    const userChannelsService = await fetch(`${url}/api/user/${uid}/channels`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authentication': 'Bearer ' + `${token}`
            
        }
    })
    const data = await userChannelsService.json();

    // console.log(data)
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