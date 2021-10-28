import type { NextApiRequest, NextApiResponse } from "next";
import { getUserChannels, getChannelsToDiscover } from "../../../../controller/channels";
import { requireAuth } from '../../../../middlewares/auth';

export default function user(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        if (req.headers.Discover === "true") {
            return getChannelsToDiscover(req, res)
        } else {
            return getUserChannels(req, res)
        }
    }
    else {
        console.log('hola mal todo')
    }
}
