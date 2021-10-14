const { PrismaClient } = require('@prisma/client');
const { isAValidEmail } = require('../utils/utils');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

const { secret } = require('../config');

module.exports = {
  authenticateUser: async (req, resp) => {
    try {
      const { email, password } = req.body;
      if (!email || !password || !isAValidEmail(email)) {
        return resp.status(400).json({ message: 'Bad Request' });
      }
      const user = await prisma.user.findUnique({
        where: { email: email },
      });
      if (user === null) {
        return resp.status(404).json({ message: 'Not found' });
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) console.info(err);
        else if (!result) {
          return resp.status(404).json({ message: 'contraseña incorrecta' });
        }
        jwt.sign(
          {
            uid: user.id,
            email: user.email,
            name: user.name,
            password: user.password,
          },
          secret,
          { expiresIn: '2h' },
          (err, token) => {
            if (err) {
              console.error(err);
            }
            return resp.status(200).json({ token });
          }
        );
      });
    } catch (error) {
      return resp.status(500).json({ message: 'Internal server error' });
    }
  },
};
