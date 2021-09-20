import type { NextApiRequest, NextApiResponse } from 'next'
import {runMiddleware, fn} from '../../../midlewares/auth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    // Run the middleware
    await runMiddleware(req, res, fn)
      // Rest of the API logic
  if(req.method === 'GET'){

    res.status(200).json({ "name": req.method })
  }
  else{
    res.status(405).json({"message":"only suport method get"})
  }
}
