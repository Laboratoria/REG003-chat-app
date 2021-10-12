const dotenv = require('dotenv');
dotenv.config({ path: 'secrets.env' });

const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});
// console.log(pool);
// console.log(process.env.DB_HOST);
// new Promise((resolve, reject) => {
//   const sql = 'SELECT * FROM users';
//   pool.query(sql, (error, result) => {
//     if (error) reject(error);
//     resolve(result);
//   });
// })
//   .then((e) => console.log(e.rows))
//   .catch((error) => console.log(error));

module.exports = pool;
