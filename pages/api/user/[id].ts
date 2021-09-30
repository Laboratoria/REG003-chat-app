import type { NextApiRequest, NextApiResponse } from 'next'
import { getUserByIdIOrEmail, updateUser, deleteUser } from '../../../controller/user'
import { runMiddleware } from '../../../middlewares/auth'


type Data = {
  name?: any
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    return getUserByIdIOrEmail(req, res)
  }
  if (req.method === 'PUT') {
    updateUser(req, res)
  }
  // res.status(200).json({ "name": req.query.id })
  if(req.method === 'DELETE') {
    return runMiddleware(req, res, deleteUser)
  }
  res.status(200).json({ "name":req.query.id,})
}
