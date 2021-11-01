import { NextApiResponse } from 'next'
import { Next } from '../types/custom'
import err from '../middlewares/error'
import prisma from '../lib/prisma'
import { NextApiResponseServerIO } from "../types/next";

export const getMessage = async (req: Next.Custom, res: NextApiResponse) => {
    try {
        const id = req.query.id;
        const { cursor } = req.headers;
        if (!id) {
            err(400, req, res)
        }
        const messages = await prisma.message.findMany({
            take: 20,
            cursor: {
                id: cursor ? Number(cursor) : 1,
            },
            where: {
                channelId: Number(id)
            }, orderBy: {
                createdAt: "asc"
            },
            include: { user: true },
        })
        if (messages.length === 0) {
            return res.status(200).json({
                ok: true,
                content: [],
                message: 'There are any messages'
            })
        }
        const lastMessage = messages[(messages.length - 1)]
        const myCursor = lastMessage.id
        return res.status(200).json({
            ok: true,
            content: messages,
            message: 'success',
            cursorChannel: myCursor,
        })
    } catch (error: any) {
        console.log(error)
        return err(500, req, res);
    }
}

export const updateMessage = async (req: Next.Custom, res: NextApiResponse) => {
    try {
        const { id } = req.query;
        const { body, attachment } = req.body;
        if (!body && !!attachment) {
            err(400, req, res)
        }
        const message = await prisma.message.update({
            where: {
                id: Number(id)
            }, data: {
                body,
                attachment
            }
        })
    } catch (error: any) {
        console.log(error)
        return err(500, req, res);
    }
}

export const postMessage = async (req: Next.Custom, res: NextApiResponseServerIO) => {
    try {
        const { id } = req.query;
        const { content, attachment, uid } = req.body;
        if (!content && !uid) {
            err(400, req, res)
        }
        const message = await prisma.message.create({
            data: {
                userId: uid,
                channelId: Number(id),
                body: content,
                attachment
            }
        })
        res?.socket?.server?.io?.emit("send-message", message);
    } catch (error: any) {
        console.log(error)
        return err(500, req, res);
    }
}

