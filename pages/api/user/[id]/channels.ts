import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserChannels } from "../../../../controller/channels";

export default function user(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        return getUserChannels(req, res)
    }
    else {
        console.log('hola mal todo')
    }
}
