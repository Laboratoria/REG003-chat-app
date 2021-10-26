import { NextApiResponse } from 'next'
import { Next } from '../types/custom'
import err from '../middlewares/error'
import prisma from '../lib/prisma'

export const getMessage = async (req: Next.Custom, res: NextApiResponse) => {
    try {
//channel deberia ser un query id?
        const { channel, cursor } = req.headers
        if (!channel) {
            err(400, req, res)
        }
        const messages = await prisma.message.findMany({
            take: 20,
            cursor: {
                id: cursor ? Number(cursor) : 1,
            },
            orderBy: {
                createdAt: "desc"
            }, where: {
                channelId: Number(channel)
            }
        })
        const lastMessage = messages[(messages.length - 1)]
        const myCursor = lastMessage.id
        return res.status(200).json({ messages, myCursor })
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

