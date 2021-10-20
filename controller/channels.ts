import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma";
import err from '../middlewares/error';

export const getAllChannels = async (req: NextApiRequest, res: NextApiResponse) => {

    //TODO: IMPROVE QUERY GETALLUSER
    try {
        let myCursor = 1;
        const allChannels = await prisma.channel.findMany({
            take: 10,
            skip: 1, // Skip the cursor
            cursor: {
                id: myCursor,
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        const lastPostInResults = allChannels[9] // Remember: zero-based index! :)
        myCursor = lastPostInResults.id;

        return res.status(200).json({
            ok: true,
            content: allChannels,
            message: 'success'
        })
    } catch (error) {
        return err(500, req, res);
    }
}