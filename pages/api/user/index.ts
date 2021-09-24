import type { NextApiRequest, NextApiResponse } from 'next'
import { createUser } from '../../../controller/user'

export default function user(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === 'POST'){
    createUser(req, res)
}
else{
  console.log('hola mal todo')
}
}


/*EXAMPLE USAGE MIDDLEWARE
import { runMiddleware } from '../../../middlewares/auth'

const controller = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    res.status(200).json({ "name": req.method })
  }
  else {
    res.status(405).json({ "message": "only suport method get" })
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  runMiddleware(req, res, controller)
  // Rest of the API logic its in the callback controller

} */
