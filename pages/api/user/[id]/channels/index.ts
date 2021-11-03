import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserChannels } from '../../../../../controller/channels';
import { requireAuth } from '../../../../../middlewares/auth';

export default function userChannel(
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
