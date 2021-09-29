import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import { isValidEmail, isWeakPassword, validateParams } from "../utils/utils";

type CreateUserResponse = {
  id: number;
  email: string;
  password?: string;
  username: string;
  profile_image: string;
};
//TODO-DONE format to email utils y password valid
export const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !isValidEmail(email) || !isWeakPassword(password)) {
      console.log(username, email, password);
      return res.status(400).json({ ok: false, message: "bad request" });
    }
    const passwordCrypt = bcrypt.hashSync(password, 10);
    const newUser = await prisma.user.create({
      data: { email, password: passwordCrypt, username },
    });
    const responseUser: CreateUserResponse = { ...newUser };
    console.log(newUser);
    delete responseUser.password;
    return res.json(responseUser);
  } catch (error) {
    if (error.code === "P2002") {
      console.log("error en prisma");
      return res.status(400).json({
        ok: false,
        message: "Bad request",
      });
    }
    return res.status(500).json({
      ok: false,
      message: "server error",
    });
  }
};

//TODO-DONE: CREATE CONTROLLER GET USER

export const getAllUser = async (req:NextApiRequest, res:NextApiResponse) => {

  //TODO: IMPROVE QUERY GETALLUSER
  try {

    const user = await prisma.user.findMany({
      select: {password:false, id:true, email:true, username:true, profile_image:true}
    })
    return res.json({
      ok: true,
      content: user,
      message: null
    })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      content: null,
      message: "server error"
    })
  }
}

//TODO CONTROLLER getUserByIdOrEmail 

export const getUserByIdIOrEmail = async(req:NextApiRequest, res:NextApiResponse) => {

  try {
    const {id} = req.query;
    const data = validateParams(id)
    if(!data){
      return res.status(400).json({
        ok:false,
        content:null,
        message: "Bad request"
      })
    } 

    const findParams = await prisma.user.findUnique({
      where:data,
      select: {password:false, id:true, email:true, username:true, profile_image:true}

    })

    if(!findParams ){
      return res.status(400).json({
        ok:false,
        content:null,
        message: "Bad request"
      })
    } 
    
    res.json({
      ok:true,
      content: findParams
    })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      content: null,
      message: "server error"
    })
  }

}