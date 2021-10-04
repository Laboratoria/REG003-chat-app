import type { NextApiRequest, NextApiResponse } from 'next'
import {authController} from '../../controller/auth'

async function authRoute (req:NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST'){
    authController(req, res)
  }
  else res.status(405).json({ok: 'false', message:'Method Not Allowed '})

}

export default authRoute