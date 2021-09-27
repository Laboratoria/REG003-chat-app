import type { NextApiRequest, NextApiResponse } from 'next';
import prisma  from '../lib/prisma'
import bcrypt from 'bcrypt';
import Password from 'antd/lib/input/Password';

type CreateUserResponse = { id: number; email: string; password?: string; username: string,profile_image: string  }
//TODO format to email utils y password valid
export const createUser = async (req: NextApiRequest, res: NextApiResponse) =>{
  try{
    const { username, email, password } = req.body;
if(!username || !email || !password){
  console.log(username, email, password)
  return res.status(400).json({ok:false, message:'bad request'})
}
const passwordCrypt = bcrypt.hashSync(password, 10);
const newUser = await prisma.user.create({ data : { email, password:passwordCrypt, username } })
const responseUser : CreateUserResponse= { ...newUser };
console.log(newUser)
delete responseUser.password;
return res.status(200).json({ok:true ,responseUser})

  }catch (error) {
    if(error.code === 'P2002'){
      console.log('error en prisma')
      return res.status(400).json({
        ok:false,
        message: "Bad request"
      })
    }
    return res.status(500).json({
      ok:false,
      message: "server error"
    })
  }

}