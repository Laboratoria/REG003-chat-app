// const { selectAllData, insertData } = require('../database/crud.js');
// const httpErrors = {
//   400: 'Bad request',
//   401: 'Unauthorized',
//   403: 'Forbidden',
//   404: 'Not found',
//   500: 'Internal server error',
// };

// module.exports = {
//   getUsers: async () => {
//     try {
//       const res = await selectAllData();
//       return res.rows;
//     } catch (error) {
//       console.log(':(', error);
//     }
//   },
//   createUser: async (req, resp) => {
//     try{
//       const { name, email, password } = req.body;
//       if(!name || !email || !password ) return resp.status(400).json({ message: 'Bad request' });
//     } catch (error) {

//     }
//   }
// };
// // selectAllData()
// //   .then((e) => console.log('soy el resolve', e))
// //   .catch((error) => console.log('soy el error', error));
