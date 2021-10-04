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
    return updateUser(req, res)
  }
  if (req.method === 'DELETE') {
    return runMiddleware(req, res, deleteUser)
  }
  res.status(200).json({ name: req.query.id, })
}
