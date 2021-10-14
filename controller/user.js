const { PrismaClient } = require('@prisma/client');
const { isAValidEmail } = require('../utils/utils');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

// const httpErrors = {
//   400: 'Bad request',
//   401: 'Unauthorized',
//   403: 'Forbidden',
//   404: 'Not found',
//   500: 'Internal server error',
// };

module.exports = {
  createUser: async (req, resp) => {
    try {
      const { email, name, password } = req.body;
      if (!email || !password || !name || !isAValidEmail(email)) {
        return resp.status(400).json({ message: 'Bad request' });
      }
      const passwordBcrypt = bcrypt.hashSync(password, 10);
      const newUser = await prisma.user.create({
        data: {
          email,
          name,
          password: passwordBcrypt,
        },
      });
      return resp.status(200).json(newUser);
    } catch (error) {
      if (error.code === 'P2002') {
        return resp
          .status(403)
          .json({ message: 'Forbidden, email already exists' });
      }
      return resp.status(500).json({
        message: 'Internal server error',
      });
    }
  },
};
