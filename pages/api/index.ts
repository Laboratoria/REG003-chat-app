import type { NextApiRequest, NextApiResponse } from 'next'
import pkg from '../../package.json'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === 'GET'){
    res.status(200).json({
        "name": pkg.name,
        "version": pkg.version,
    })
}else{
  res.status(400).json({
  "message":"bad request"
})
}
}