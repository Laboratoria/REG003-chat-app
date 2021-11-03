import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteChannel, updateChannel, getChannelById } from '../../../../controller/channels';
import { requireAuth } from '../../../../middlewares/auth'

export default function channelId(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'DELETE') {
        return requireAuth(req, res, deleteChannel)
    } else if (req.method === 'PUT') {
        return requireAuth(req, res, updateChannel)
    } else if (req.method === 'GET') {
        return requireAuth(req, res, getChannelById)
    }
    else {
        console.log('hola mal todo')
    }
}
