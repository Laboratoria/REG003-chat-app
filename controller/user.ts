import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import { isValidEmail, isWeakPassword } from "../utils/utils";

type User = {
  id: number;
  email: string;
  password?: string;
  username: string;
  profile_image: string;
};
//TODO-DONE format to email utils y password valid
type CreateUserResponse = { id: number; email: string; password?: string; username: string, profile_image: string }
//TODO format to email utils y password valid

export const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !isValidEmail(email) || isWeakPassword(password)) {
      return res.status(400).json({ ok: false, message: "bad request" });
    }
    const passwordCrypt = bcrypt.hashSync(password, 10);
    const newUser = await prisma.user.create({
      data: { email, password: passwordCrypt, username },
    });
    const responseUser: User = { ...newUser };
    delete responseUser.password;
    return res.status(200).json({ok:true, user:responseUser});
  } catch (error: any) {
    if (error.code === "P2002") {
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

export const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    let { username, email, password } = req.body;
    if (!username && !email && !password && !id) {
      return res.status(400).json({ ok: false, message: "Bad Request" });
    } else {
      if (password) {
        password = await bcrypt.hash(password, 10);
      }
      const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: {
          email,
          password,
          username
        }
      });
      const responseUser: User = { ...updatedUser };
      delete responseUser.password;
      return res.status(200).json(responseUser);
    }
  } catch (error: any) {

    if (error.code === "P2025") {
      return res.status(404).json({
        ok: false,
        message: error.meta.cause
      });
    }
    return res.status(500).json({
      ok: false,
      message: "server error",
})
  }}

export const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query
    if(!id){
      return res.status(400).json({ok:false, message:'Bad Request'})
    }
    const user = await prisma.user.delete({ where: { id: Number(id)}})
    if (!user){
      return res.status(404).json({ok:false, message:'Not Found'})
    }

  return res.status(200).json({ok:true, user})
  }catch (error: any) {
    return res.status(500).json({
      ok: false,
      message: "server error"
    });
  }
}
