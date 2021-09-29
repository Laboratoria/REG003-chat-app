import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import {secret} from '../config'
import prisma from '../lib/prisma';

export const  runMiddleware = (req:NextApiRequest, res: NextApiResponse, fn:any) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ok:false, message:'Unauthorized'})
  }

  const [type, token] = authorization.split(' ');

  if (type.toLowerCase() !== 'bearer') {
    return res.status(401).json({ok:false, message:'Unauthorized'})
  }

  jwt.verify(token, secret, async (err:any, decodedToken:any) => {
    if (err) {
      return res.status(403).json({ok: false, message:'Forbidden'});
    }
    const userValid = await prisma.user.findUnique({ where: { email: decodedToken.email } });
    try {
      if (!userValid) {
        return res.status(404).json({ok:false, message:'Not Found'});
      }

    } catch (error) {
      return res.status(500).json({ok: false, message:'Server Error'});}
  });
    fn(req, res)
  }

const isSameUser = async(req:NextApiRequest, res: NextApiResponse, decodeToken:any, cb:any)=>{
    const { id } = req.query
    const user = await prisma.user.findUnique({ where: { id:Number(id) } });
    if(!user){
      return res.status(404).json({'ok':false, 'message':'Bad Request'})
    }
    if(user.email === decodeToken.email){
    return cb(req, res)
    }
    else{
      return res.status(403).json({'ok':false, 'message':'Forbidden'})
    }
  }