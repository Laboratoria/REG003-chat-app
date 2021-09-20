import type { NextApiRequest, NextApiResponse } from 'next'
import {runMiddleware} from '../../../midlewares/auth'

const controller = (req:NextApiRequest, res:NextApiResponse)=>{


export default  function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    // Run the middleware
runMiddleware(req, res, controller)
      // Rest of the API logic its in the callback controller

}
