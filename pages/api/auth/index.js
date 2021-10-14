const { authenticateUser } = require('../../../controller/auth');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    authenticateUser(req, res);
  } else {
    console.log('error');
  }
}
