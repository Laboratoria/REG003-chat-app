import type { NextApiRequest, NextApiResponse } from 'next';
import { getChannelsToDiscover, createChannel } from '../../../controller/channels';
import { requireAuth } from "../../../middlewares/auth";

export default function user(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        // return requireAuth(req, res, getAllChannels)
        return getChannelsToDiscover(req, res)
    } else if (req.method === "POST") {
        //return createChannel(req, res);
        return requireAuth(req, res, createChannel)
    } else {
        console.log('hola mal todo')
    }
}

