import type { NextApiRequest, NextApiResponse } from 'next'
import { getUserByIdIOrEmail, updateUser, deleteUser } from '../../../controller/user'
import { runMiddleware } from '../../../middlewares/auth'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    return getUserByIdIOrEmail(req, res)
  }
  if (req.method === 'PUT') {
    return runMiddleware(req, res, updateUser)
  }
<<<<<<< Updated upstream
  // res.status(200).json({ "name": req.query.id })
  if(req.method === 'DELETE') {
=======

    if(req.method === 'DELETE') {
>>>>>>> Stashed changes
    return runMiddleware(req, res, deleteUser)
  }
  else res.status(405).json({ok: 'false', message:'Method Not Allowed '})

}
