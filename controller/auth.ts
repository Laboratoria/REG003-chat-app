import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
//TODO :CONFIGURAR SECRET MEJOR Y MODIFICAR TIEMPO DEL TOKEN AL PASAR A PRODU

  const secret = process.env.SECRET || 'holaMundo'

const prisma = new PrismaClient(); //hacer como un config de prima y asi solo hacer 1 instancia
export const authController = async (req:NextApiRequest, res:NextApiResponse)=>{
await prisma.$connect();

  const {email, password} =req.body;

  if(!email || !password || !/\S+@\S+\.\S+/.test(email)){
    console.log('entre al 1')
    return res.status(400).json({'message': 'Bad Request'})
  }
  const user = await prisma.user.findUnique({ where: { email: email } });
console.log(user)
if(user ===null){
  return res.status(404).json({'message':'Not Found'})
};
/* user.password = bcrypt.hashSync(password, 10); */
if( !bcrypt.compareSync(password, user.password)){
  console.log('entre aqui')
  return res.status(400).json({'message': 'Bad Request'})
}
jwt.sign(
    {
      uid: user.id,
      email: user.email,
    },
    secret,
    {
      expiresIn: '8h',
    },
    (err, token) => {
      if (err) console.error(err);
      return res.status(200).json({ token });
    },
  );
  }
