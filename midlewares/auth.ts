import type { NextApiRequest, NextApiResponse } from 'next'

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export const  runMiddleware = (req:NextApiRequest, res: NextApiResponse, fn:any) => {
  if (!req.body) {
    return (res.status(401).json({"message": "error"}))
}
    fn(req, res)
  }

/* async function handler(req:NextApiRequest, res: NextApiResponse) {

  // Run the middleware
  await runMiddleware(req, res, fn)

  // Rest of the API logic
  res.json({ message: 'Hello Everyone!' })
} */
