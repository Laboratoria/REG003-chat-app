import { any } from "jest-mock-extended";
import type { NextApiResponse } from "next";
import prisma from "../lib/prisma";
import err from '../middlewares/error';
import { Next } from "../types/custom";

export const getChannelsToDiscover = async (req: Next.Custom, res: NextApiResponse) => {
    //TODO: IMPROVE QUERY GETALLUSER
    try {
        const { id } = req.query;
        console.log(id);
        
        const { cursor } = req.headers
        let myCursor = cursor ? Number(req.headers.cursor) : 1;
        const channelsToDiscover = await prisma.channelUser.findMany({
            take: 10,
            cursor: {
                id: myCursor,
            },
            where:{
                NOT:{
                     userId: Number(id) 
                }
            },
            include: { channel: true },

        })

        if (channelsToDiscover.length === 0) {
            return res.status(200).json({
                ok: true,
                content: [],
                message: 'There are no registered channels'
            })
        }
        const lastPostInResults = channelsToDiscover[(channelsToDiscover.length - 1)] // Remember: zero-based index! :)
        myCursor = lastPostInResults.id
        return res.status(200).json({
            ok: true,
            content: channelsToDiscover,
            message: 'success',
            cursorChannel: myCursor,
        })
    } catch (error) {
        console.log(error)
        return err(500, req, res);
    }
}

export const getUserChannels = async (req: Next.Custom, res: NextApiResponse) => {
    try {
        const { id } = req.query;
        const userChannels = await prisma.channelUser.findMany({
            where: { userId: Number(id) },
            include: { channel: true },
        });
        return res.status(200).json(userChannels)
    } catch (error) {
        return err(500, req, res)
    }
}

export const deleteChannel = async (req: Next.Custom, res: NextApiResponse) => {
    try {
        const { id } = req.query;
        const deleteChannel = await prisma.channel.delete({ where: { id: Number(id) } })
        return res.status(200).json(deleteChannel)
    }
    catch (error: any) {
        if (error.code === "P2025") {
            return err(404,
                req,
                res)
        }
        else {
            return err(500,
                req,
                res)
        }
    }

}

export const updateChannel = async (req: Next.Custom, res: NextApiResponse) => {
    try {
        const { id } = req.query;
        const { name, description, channelImage } = req.body;
        if (!name && !description && !channelImage) {
            return err(400, req, res)
        }
        const updateChannel = await prisma.channel.update({
            where: { id: Number(id) }, data: {
                name,
                description,
                //@ts-ignore
                channelImage
            }
        })
        return res.status(200).json(updateChannel)
    }
    catch (error: any) {
        if (error.code === "P2025") {
            return err(404,
                req,
                res)
        }
        else {
            return err(500,
                req,
                res)
        }
    }

}

//TODO: CREATE CHANNEL AND USERID
export const createChannel = async (req: Next.Custom, res: NextApiResponse) => {

    try {
        const { name, description, channelImage } = req.body;
        const uid = req.authentication?.uid;

        if ((!name) || (!uid)) {
            return err(400, req, res);
        }

        const newChannel = await prisma.channel.create({
            data: {
                name,
                description,
                //@ts-ignore
                channelImage,
                users: {
                    create: { userId: uid }
                }
            }
        });
        return res.json(newChannel);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ "name": error })
    }
}

