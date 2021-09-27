import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { secret } from "../config";
import { isValidEmail } from "../utils/utils";
//TODO :CONFIGURAR SECRET MEJOR Y MODIFICAR TIEMPO DEL TOKEN AL PASAR A PROD
// ASSIGNED TO: DENISSITA

console.log(secret);

export const authController = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password || !isValidEmail(email)) {
      return res.status(400).json({
        ok: false,
        content: null,
        message: "Bad Request",
      });
    }
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (user === null) {
      return res.status(404).json({
        ok: false,
        content: null,
        message: "Not Found",
      });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      console.log("entre aqui");
      return res.status(400).json({
        ok: false,
        content:null,
        message: "Bad Request",
      });
    }

    jwt.sign(
      {
        uid: user.id,
        email: user.email,
      },
      secret,
      {
        expiresIn: "8h",
      },
      (err, token) => {
        console.log(token);

        if (err) console.error(err);
        return res.json({
          ok: true,
          token,
        });
      }
    );
  } catch (error) {

    return res.status(500).json({
      ok: false,
      content: null,
      message: "server error",

    });
  }
};
