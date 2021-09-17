import type { NextApiRequest, NextApiResponse } from 'next'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === 'GET'){

    res.status(200).json({ "name": req.method })
  }
  else{
    res.status(405).json({"message":"only suport method get"})
  }
}
