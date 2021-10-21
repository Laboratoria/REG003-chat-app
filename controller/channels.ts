import type { NextApiResponse } from "next";
import prisma from "../lib/prisma";
import err from '../middlewares/error';
import { Next } from "../types/custom";

export const getAllChannels = async (req: Next.Custom, res: NextApiResponse) => {

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
        const { name, description } = req.body;
        if (!name && !description) {
            return err(400, req, res)
        }
        const updateChannel = await prisma.channel.update({
            where: { id: Number(id) }, data: {
                name,
                description
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