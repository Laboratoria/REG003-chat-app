import type { NextApiRequest, NextApiResponse } from 'nex
import {authController} from '../../controller/auth'

async function authRoute (req:NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST'){
    authController(req, res)
  }
  else res.status(405).json({'message':'Method Not Allowed '})

}

export default authRoute