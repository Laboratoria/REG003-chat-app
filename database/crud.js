const pool = require('./database.js');

module.exports = {
  selectAllData: () =>
    new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM users';
      pool.query(sql, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    }),
  insertData: (table, dataToInsert) =>
    new Promise((resolve, reject) => {
      const sql = `INSERT INTO ${table} SET ?`;
      pool.query(sql, [dataToInsert], (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    }),
};
