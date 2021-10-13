const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const { isAValidEmail } = require('../utils/utils.js');

const httpErrors = {
  400: 'Bad request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not found',
  500: 'Internal server error',
};

module.exports = {};
