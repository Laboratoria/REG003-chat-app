import type { NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { secret } from '../config'
import prisma from '../lib/prisma';
import { Next } from '../types/custom';

export const requireAuth = (req: Next.Custom, res: NextApiResponse, next: any) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ ok: false, message: 'Unauthorized' })
  }

  const [type, token] = authorization.split(' ');

  if (type.toLowerCase() !== 'bearer') {
    return res.status(401).json({ ok: false, message: 'Unauthorized' })
  }

  jwt.verify(token, secret, async (err: any, decodedToken: any) => {
    try {
      if (err) {
        return res.status(403).json({ ok: false, message: 'Forbidden' });
      } else {
        const userValid = await prisma.user.findUnique({ where: { email: decodedToken.email } });
        if (!userValid) {
          return res.status(404).json({ ok: false, message: 'Not Found' });
        }
        req.authentication = decodedToken;
        console.log("token", req.authentication)
      }
      return next(req, res)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ ok: false, message: 'Server Error' });
    }
  });
}

export const requireSameUser = async (req: Next.Custom, res: NextApiResponse, next: any) => {
  //llamar dentro al primer middleware del auth
  try {
    requireAuth(req, res, async()=>{
      const { id } = req.query
      if (!id) {
        return res.status(404).json({ 'ok': false, 'message': 'Bad Request from IsSameUser' })
      }
      const user = await prisma.user.findUnique({ where: { id: Number(id) } });
      if (!user) {
        return res.status(404).json({ 'ok': false, 'message': 'Bad Request from IsSameUser' })
      }
      if (user.email === req.authentication?.email) {
        return next(req, res)
      }
      else {
        return res.status(403).json({ 'ok': false, 'message': 'Forbidden from IsSameUser' })
      }
    })

  } catch (error) {
    return res.status(500).json({ ok: false, message: 'Server Error from IsSameUser' });
  }
}