// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { getUsers, createUser } = require('../../controller/user.js');

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case 'POST':
      return createUser(req, res);
    default:
      return res
        .status(405)
        .json({ success: false })
        .end(`Method ${method} Not Allowed`);
  }
  // const resp = await getUsers();
  // console.log(resp);
  // res.status(200).json({ data: resp });
}
