import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma";
import err from '../middlewares/error';

// type Channel = {
//     id: number,
//     name: string,
//     description: string,
//     channelImage: string
// }

export const getAllChannels = async (req: NextApiRequest, res: NextApiResponse) => {

    //TODO: IMPROVE QUERY GETALLUSER
     try {
         
        const { cursor } = req.headers
        let myCursor = cursor ? Number(req.headers.cursor) : 1;

        const allChannels = await prisma.channel.findMany({
            take: 10,
            cursor: {
                id: myCursor,
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        
        if (allChannels.length===0) {
            return res.status(200).json({
            ok: true,
            content: [],
            message: 'There are no registered channels'
        })
        }
        const lastPostInResults = allChannels[(allChannels.length - 1)] // Remember: zero-based index! :)
        myCursor = lastPostInResults.id
        return res.status(200).json({
            ok: true,
            content: allChannels,
            message: 'success',
            cursorChannel: myCursor,
        })
    } catch (error) {
        console.log(error)
        return err(500, req, res);
    }

}

//TODO: CREATE CHANNEL AND USERID
export const createChannel = async ( req:NextApiRequest, res:NextApiResponse) => {

    try {
        const {name, description, channelImage} = req.body;

        const {uid} = req.authentication
       
        if (!name) {
            return err(400, req, res);
        }
        console.log('63', uid);
        
        const newChannel = await prisma.channel.create({
            data:{
                name,
                description,
                channelImage,
                users:{
                    create:{userId:uid }
                    //create:{userId: user.id}
                }
            }
        })
         console.log('holaaaa2');

        // const responseChannel: Channel = {...newChannel}
        
        console.log(newChannel);
        
    
        return res.json({"hola": "mundo"})
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({"name":error})
    }
}

