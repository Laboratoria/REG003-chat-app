import type { NextApiRequest, NextApiResponse } from 'next'
import { getUserByIdIOrEmail } from '../../../controller/user'

type Data = {
  name?: any
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //res.status(200).json({ "name":req.query.id  })
  if(req.method === 'GET'){
    getUserByIdIOrEmail(req,res)
  }
}
