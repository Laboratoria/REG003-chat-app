import type { NextApiResponse } from 'next';
import {Next} from '../../../../../types/custom'
import { joinChannel, deleteUserChannel } from '../../../../../controller/channelUser'

export default function userChannel(
  req: Next.Custom,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    return joinChannel(req, res);
  }
  else if (req.method === 'DELETE') {
console.log('delete')
return deleteUserChannel(req, res)
  }
  else {
    console.log('hola mal todo')
  }
}