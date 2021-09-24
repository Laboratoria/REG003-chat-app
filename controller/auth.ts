import type { NextApiRequest, NextApiResponse } from 'next';
import prisma  from '../lib/prisma'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {secret} from '../config'
//TODO :CONFIGURAR SECRET MEJOR Y MODIFICAR TIEMPO DEL TOKEN AL PASAR A PROD
// ASSIGNED TO: DENISSITA

console.log(secret);


export const authController = async (req: NextApiRequest, res: NextApiResponse) => {

  try {
    const { email, password } = req.body;
  console.log(email, password);

  if (!email || !password || !/\S+@\S+\.\S+/.test(email)) {
    console.log('entre al 1')
    return res.status(400).json({ ok: false,
      message: 'Bad Request'  })
  }
  const user = await prisma.user.findUnique({ where: { email: email } });
  
  
  console.log(user)
  if (user === null) {
    return res.status(404).json({ 
      ok: false,
      message: 'Not Found'
    })
  };
  //  user.password = bcrypt.hashSync(password, 10); 
  if (!bcrypt.compareSync(password, user.password)) {
    console.log('entre aqui')
    return res.status(400).json({
      ok: false,
      message: 'Bad Request' 
    })
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
      console.log(token);
      
      if (err) console.error(err);
      return res.status(200).json(
        { 
        ok:true,
        token
        }
       );
    },
  );
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({
      ok:false,
      content: "server error"
    })
  }
  
  
}

