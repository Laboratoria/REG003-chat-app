import type { NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { secret } from '../config'
import prisma from '../lib/prisma';
import { Next } from '../types/custom';

export const runMiddleware = (req: Next.Custom, res: NextApiResponse, next: any) => {
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
    }else{
      const userValid = await prisma.user.findUnique({ where: { email: decodedToken.email } });
    if (!userValid) {
      return res.status(404).json({ ok: false, message: 'Not Found' });
    }
    req.authentication = decodedToken;}

    } catch (error) {
      console.log(error)
      return res.status(500).json({ ok: false, message: 'Server Error' });
    }
  });

  return isSameUser(req, res, next)
}

export const isSameUser = async (req: Next.Custom, res: NextApiResponse, next: any) => {
  try{
    const { id } = req.query
    if(!id){
      return res.status(404).json({ 'ok': false, 'message': 'Bad Request' })
    }
  const user = await prisma.user.findUnique({ where: { id: Number(id) } });
  if (!user) {
    return res.status(404).json({ 'ok': false, 'message': 'Bad Request' })
  }
  if (user.email === req.authentication?.email) {
    return next(req, res)
  }
  else {
    return res.status(403).json({ 'ok': false, 'message': 'Forbidden' })
  }}catch (error) {
    return res.status(500).json({ ok: false, message: 'Server Error' });
  }
}