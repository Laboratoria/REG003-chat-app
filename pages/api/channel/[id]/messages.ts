import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../../../types/next";
import { getMessage, postMessage } from '../../../../controller/messages';
import { requireAuth } from '../../../../middlewares/auth'

export default function channelMessage(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (req.method === 'GET') {
    return getMessage(req, res)
  }
  else if (req.method === 'POST') {
    return postMessage(req, res)
  }
  else {
    console.log('hola mal todo')
  }
}