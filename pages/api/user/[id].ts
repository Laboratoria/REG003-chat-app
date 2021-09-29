import type { NextApiRequest, NextApiResponse } from 'next'
import { updateUser } from '../../../controller/user'
import { runMiddleware } from '../../../middlewares/auth'
import {deleteUser} from '../../../controller/user'

type Data = {
  name?: any
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'PUT') {
    updateUser(req, res)
  }
  // res.status(200).json({ "name": req.query.id })
    if(req.method === 'DELETE') {
    return runMiddleware(req, res, deleteUser)
  }
  res.status(200).json({ "name":req.query.id,})
}
