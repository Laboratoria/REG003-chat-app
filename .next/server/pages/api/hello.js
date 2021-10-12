(() => {
var exports = {};
exports.id = "pages/api/hello";
exports.ids = ["pages/api/hello"];
exports.modules = {

/***/ "./controller/user.js":
/*!****************************!*\
  !*** ./controller/user.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  selectAllData
} = __webpack_require__(/*! ../database/crud.js */ "./database/crud.js");

module.exports = {
  getUsers: async () => {
    try {
      const res = await selectAllData();
      return res.rows;
    } catch (error) {
      console.log(':(', error);
    }
  }
}; // selectAllData()
//   .then((e) => console.log('soy el resolve', e))
//   .catch((error) => console.log('soy el error', error));

/***/ }),

/***/ "./database/crud.js":
/*!**************************!*\
  !*** ./database/crud.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const pool = __webpack_require__(/*! ./database.js */ "./database/database.js");

module.exports = {
  selectAllData: () => new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users';
    pool.query(sql, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  }),
  insertData: (table, dataToInsert) => new Promise((resolve, reject) => {
    const sql = `INSERT INTO ${table} SET ?`;
    pool.query(sql, [dataToInsert], (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  })
};

/***/ }),

/***/ "./database/database.js":
/*!******************************!*\
  !*** ./database/database.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const dotenv = __webpack_require__(/*! dotenv */ "dotenv");

dotenv.config({
  path: 'secrets.env'
});

const {
  Pool
} = __webpack_require__(/*! pg */ "pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
}); // console.log(pool);
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

/***/ }),

/***/ "./pages/api/hello.js":
/*!****************************!*\
  !*** ./pages/api/hello.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const {
  getUsers
} = __webpack_require__(/*! ../../controller/user.js */ "./controller/user.js");

async function handler(req, res) {
  const resp = await getUsers();
  console.log(resp);
  res.status(200).json({
    data: resp
  });
}

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("dotenv");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("pg");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/api/hello.js"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0FJLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZNkIsSUFBWjtBQUNBakMsRUFBQUEsR0FBRyxDQUFDa0MsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQUVDLElBQUFBLElBQUksRUFBRUg7QUFBUixHQUFyQjtBQUNEOzs7Ozs7Ozs7OztBQ1BEOzs7Ozs7Ozs7OztBQ0FBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2hhdC1hcHAvLi9jb250cm9sbGVyL3VzZXIuanMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAvLi9kYXRhYmFzZS9jcnVkLmpzIiwid2VicGFjazovL2NoYXQtYXBwLy4vZGF0YWJhc2UvZGF0YWJhc2UuanMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAvLi9wYWdlcy9hcGkvaGVsbG8uanMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAvZXh0ZXJuYWwgXCJkb3RlbnZcIiIsIndlYnBhY2s6Ly9jaGF0LWFwcC9leHRlcm5hbCBcInBnXCIiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBzZWxlY3RBbGxEYXRhIH0gPSByZXF1aXJlKCcuLi9kYXRhYmFzZS9jcnVkLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRVc2VyczogYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBzZWxlY3RBbGxEYXRhKCk7XG4gICAgICByZXR1cm4gcmVzLnJvd3M7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKCc6KCcsIGVycm9yKTtcbiAgICB9XG4gIH0sXG59O1xuLy8gc2VsZWN0QWxsRGF0YSgpXG4vLyAgIC50aGVuKChlKSA9PiBjb25zb2xlLmxvZygnc295IGVsIHJlc29sdmUnLCBlKSlcbi8vICAgLmNhdGNoKChlcnJvcikgPT4gY29uc29sZS5sb2coJ3NveSBlbCBlcnJvcicsIGVycm9yKSk7XG4iLCJjb25zdCBwb29sID0gcmVxdWlyZSgnLi9kYXRhYmFzZS5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2VsZWN0QWxsRGF0YTogKCkgPT5cbiAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBzcWwgPSAnU0VMRUNUICogRlJPTSB1c2Vycyc7XG4gICAgICBwb29sLnF1ZXJ5KHNxbCwgKGVycm9yLCByZXN1bHQpID0+IHtcbiAgICAgICAgaWYgKGVycm9yKSByZWplY3QoZXJyb3IpO1xuICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICB9KTtcbiAgICB9KSxcbiAgaW5zZXJ0RGF0YTogKHRhYmxlLCBkYXRhVG9JbnNlcnQpID0+XG4gICAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3Qgc3FsID0gYElOU0VSVCBJTlRPICR7dGFibGV9IFNFVCA/YDtcbiAgICAgIHBvb2wucXVlcnkoc3FsLCBbZGF0YVRvSW5zZXJ0XSwgKGVycm9yLCByZXN1bHQpID0+IHtcbiAgICAgICAgaWYgKGVycm9yKSByZWplY3QoZXJyb3IpO1xuICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICB9KTtcbiAgICB9KSxcbn07XG4iLCJjb25zdCBkb3RlbnYgPSByZXF1aXJlKCdkb3RlbnYnKTtcbmRvdGVudi5jb25maWcoeyBwYXRoOiAnc2VjcmV0cy5lbnYnIH0pO1xuXG5jb25zdCB7IFBvb2wgfSA9IHJlcXVpcmUoJ3BnJyk7XG5cbmNvbnN0IHBvb2wgPSBuZXcgUG9vbCh7XG4gIGhvc3Q6IHByb2Nlc3MuZW52LkRCX0hPU1QsXG4gIHBvcnQ6IHByb2Nlc3MuZW52LkRCX1BPUlQsXG4gIGRhdGFiYXNlOiBwcm9jZXNzLmVudi5EQl9OQU1FLFxuICB1c2VyOiBwcm9jZXNzLmVudi5EQl9VU0VSLFxuICBwYXNzd29yZDogcHJvY2Vzcy5lbnYuREJfUEFTU1dPUkQsXG59KTtcbi8vIGNvbnNvbGUubG9nKHBvb2wpO1xuLy8gY29uc29sZS5sb2cocHJvY2Vzcy5lbnYuREJfSE9TVCk7XG4vLyBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4vLyAgIGNvbnN0IHNxbCA9ICdTRUxFQ1QgKiBGUk9NIHVzZXJzJztcbi8vICAgcG9vbC5xdWVyeShzcWwsIChlcnJvciwgcmVzdWx0KSA9PiB7XG4vLyAgICAgaWYgKGVycm9yKSByZWplY3QoZXJyb3IpO1xuLy8gICAgIHJlc29sdmUocmVzdWx0KTtcbi8vICAgfSk7XG4vLyB9KVxuLy8gICAudGhlbigoZSkgPT4gY29uc29sZS5sb2coZS5yb3dzKSlcbi8vICAgLmNhdGNoKChlcnJvcikgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwb29sO1xuIiwiLy8gTmV4dC5qcyBBUEkgcm91dGUgc3VwcG9ydDogaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvYXBpLXJvdXRlcy9pbnRyb2R1Y3Rpb25cbmNvbnN0IHsgZ2V0VXNlcnMgfSA9IHJlcXVpcmUoJy4uLy4uL2NvbnRyb2xsZXIvdXNlci5qcycpO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKHJlcSwgcmVzKSB7XG4gIGNvbnN0IHJlc3AgPSBhd2FpdCBnZXRVc2VycygpO1xuICBjb25zb2xlLmxvZyhyZXNwKTtcbiAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBkYXRhOiByZXNwIH0pO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZG90ZW52XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBnXCIpOyJdLCJuYW1lcyI6WyJzZWxlY3RBbGxEYXRhIiwicmVxdWlyZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJnZXRVc2VycyIsInJlcyIsInJvd3MiLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciLCJwb29sIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzcWwiLCJxdWVyeSIsInJlc3VsdCIsImluc2VydERhdGEiLCJ0YWJsZSIsImRhdGFUb0luc2VydCIsImRvdGVudiIsImNvbmZpZyIsInBhdGgiLCJQb29sIiwiaG9zdCIsInByb2Nlc3MiLCJlbnYiLCJEQl9IT1NUIiwicG9ydCIsIkRCX1BPUlQiLCJkYXRhYmFzZSIsIkRCX05BTUUiLCJ1c2VyIiwiREJfVVNFUiIsInBhc3N3b3JkIiwiREJfUEFTU1dPUkQiLCJoYW5kbGVyIiwicmVxIiwicmVzcCIsInN0YXR1cyIsImpzb24iLCJkYXRhIl0sInNvdXJjZVJvb3QiOiIifQ==