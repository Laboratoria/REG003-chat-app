import type { NextApiRequest, NextApiResponse } from 'next'


async function authRoute (req:NextApiRequest, res: NextApiResponse) {

  res.json({ message: 'Hello Everyone!' })
}

export default authRoute