// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { getUsers } = require('../../controller/user.js');

export default async function handler(req, res) {
  const resp = await getUsers();
  console.log(resp);
  res.status(200).json({ data: resp });
}
