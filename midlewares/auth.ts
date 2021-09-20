import type { NextApiRequest, NextApiResponse } from 'next'
// Initializing the cors middleware
export const fn =(req:NextApiRequest, res: NextApiResponse, cb:any)=> cb()

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export const  runMiddleware = (req:NextApiRequest, res: NextApiResponse, fn:any) => new Promise((resolve, reject) => {
    fn(req, res, () => {
      if (!req.body) {
        return reject(res.status(401).json({"message": "error"}))
      }

      return resolve(req.body)
    })
  })


/* async function handler(req:NextApiRequest, res: NextApiResponse) {

  // Run the middleware
  await runMiddleware(req, res, fn)

  // Rest of the API logic
  res.json({ message: 'Hello Everyone!' })
} */
