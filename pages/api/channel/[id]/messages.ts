import type { NextApiRequest, NextApiResponse } from 'next';
import { getMessage } from '../../../../controller/messages';
import { requireAuth } from '../../../../middlewares/auth'

export default function channelMessage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    /* console.log(req) */
    return getMessage(req, res)
  }
  else {
    console.log('hola mal todo')
  }
}