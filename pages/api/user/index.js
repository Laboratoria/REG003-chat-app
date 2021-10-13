// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { createUser } = require('../../../controller/user');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    createUser(req, res);
  } else {
    console.log('error');
  }
}
