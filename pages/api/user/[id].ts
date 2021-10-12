import type { NextApiRequest, NextApiResponse } from 'next'
import { getUserByIdIOrEmail, updateUser, deleteUser } from '../../../controller/user'
import { requireAuth } from '../../../middlewares/auth'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    return getUserByIdIOrEmail(req, res)
  }
  if (req.method === 'PUT') {
    return requireAuth(req, res, updateUser)
  }
  if (req.method === 'DELETE') {
    return requireAuth(req, res, deleteUser)
  }
  else res.status(405).json({ ok: 'false', message: 'Method Not Allowed ' })
}
