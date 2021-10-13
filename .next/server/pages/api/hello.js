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
  PrismaClient
} = __webpack_require__(/*! @prisma/client */ "@prisma/client");

const {
  isAValidEmail
} = __webpack_require__(/*! ../utils/utils */ "./utils/utils.js");

const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");

const prisma = new PrismaClient(); // const httpErrors = {
//   400: 'Bad request',
//   401: 'Unauthorized',
//   403: 'Forbidden',
//   404: 'Not found',
//   500: 'Internal server error',
// };

module.exports = {
  createUser: async (req, resp) => {
    try {
      const {
        email,
        name,
        password
      } = req.body;

      if (!email || !password || !name || !isAValidEmail(email)) {
        return resp.status(400).json({
          message: 'Bad request'
        });
      }

      const passwordBcrypt = bcrypt.hashSync(password, 10);
      const newUser = await prisma.user.create({
        data: {
          email,
          name,
          password: passwordBcrypt
        }
      });
      return resp.status(200).json(newUser);
    } catch (error) {
      if (error.code === 'P2002') {
        return resp.status(403).json({
          message: 'Forbidden, email already exists'
        });
      }

      return resp.status(500).json({
        message: 'Internal server error'
      });
    }
  }
}; // async function main() {
//   const newUser = await prisma.user.create({
//     data: {
//       email: 'alice@gmail.com',
//       name: 'Alice',
//       password: '12345678q',
//     },
//   });
//   return newUser;
// }
// main()
//   .then((res) => console.log(res))
//   .catch((error) => console.log(error.code));

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
  createUser
} = __webpack_require__(/*! ../../controller/user.js */ "./controller/user.js");

async function handler(req, res) {
  if (req.method === 'POST') {
    createUser(req, res);
  } else {
    console.log('error');
  }
}

/***/ }),

/***/ "./utils/utils.js":
/*!************************!*\
  !*** ./utils/utils.js ***!
  \************************/
/***/ ((module) => {

module.exports = {
  isAValidEmail: email => {
    const emailRegex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/i;
    return emailRegex.test(email);
  }
};

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("bcrypt");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OztBQ0FBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2hhdC1hcHAvLi9jb250cm9sbGVyL3VzZXIuanMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAvLi9wYWdlcy9hcGkvaGVsbG8uanMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAvLi91dGlscy91dGlscy5qcyIsIndlYnBhY2s6Ly9jaGF0LWFwcC9leHRlcm5hbCBcIkBwcmlzbWEvY2xpZW50XCIiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAvZXh0ZXJuYWwgXCJiY3J5cHRcIiJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IFByaXNtYUNsaWVudCB9ID0gcmVxdWlyZSgnQHByaXNtYS9jbGllbnQnKTtcbmNvbnN0IHsgaXNBVmFsaWRFbWFpbCB9ID0gcmVxdWlyZSgnLi4vdXRpbHMvdXRpbHMnKTtcbmNvbnN0IGJjcnlwdCA9IHJlcXVpcmUoJ2JjcnlwdCcpO1xuY29uc3QgcHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpO1xuXG4vLyBjb25zdCBodHRwRXJyb3JzID0ge1xuLy8gICA0MDA6ICdCYWQgcmVxdWVzdCcsXG4vLyAgIDQwMTogJ1VuYXV0aG9yaXplZCcsXG4vLyAgIDQwMzogJ0ZvcmJpZGRlbicsXG4vLyAgIDQwNDogJ05vdCBmb3VuZCcsXG4vLyAgIDUwMDogJ0ludGVybmFsIHNlcnZlciBlcnJvcicsXG4vLyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3JlYXRlVXNlcjogYXN5bmMgKHJlcSwgcmVzcCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGVtYWlsLCBuYW1lLCBwYXNzd29yZCB9ID0gcmVxLmJvZHk7XG4gICAgICBpZiAoIWVtYWlsIHx8ICFwYXNzd29yZCB8fCAhbmFtZSB8fCAhaXNBVmFsaWRFbWFpbChlbWFpbCkpIHtcbiAgICAgICAgcmV0dXJuIHJlc3Auc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6ICdCYWQgcmVxdWVzdCcgfSk7XG4gICAgICB9XG4gICAgICBjb25zdCBwYXNzd29yZEJjcnlwdCA9IGJjcnlwdC5oYXNoU3luYyhwYXNzd29yZCwgMTApO1xuICAgICAgY29uc3QgbmV3VXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmNyZWF0ZSh7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBlbWFpbCxcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZEJjcnlwdCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlc3Auc3RhdHVzKDIwMCkuanNvbihuZXdVc2VyKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaWYgKGVycm9yLmNvZGUgPT09ICdQMjAwMicpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BcbiAgICAgICAgICAuc3RhdHVzKDQwMylcbiAgICAgICAgICAuanNvbih7IG1lc3NhZ2U6ICdGb3JiaWRkZW4sIGVtYWlsIGFscmVhZHkgZXhpc3RzJyB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXNwLnN0YXR1cyg1MDApLmpzb24oe1xuICAgICAgICBtZXNzYWdlOiAnSW50ZXJuYWwgc2VydmVyIGVycm9yJyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbn07XG5cbi8vIGFzeW5jIGZ1bmN0aW9uIG1haW4oKSB7XG4vLyAgIGNvbnN0IG5ld1VzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5jcmVhdGUoe1xuLy8gICAgIGRhdGE6IHtcbi8vICAgICAgIGVtYWlsOiAnYWxpY2VAZ21haWwuY29tJyxcbi8vICAgICAgIG5hbWU6ICdBbGljZScsXG4vLyAgICAgICBwYXNzd29yZDogJzEyMzQ1Njc4cScsXG4vLyAgICAgfSxcbi8vICAgfSk7XG4vLyAgIHJldHVybiBuZXdVc2VyO1xuLy8gfVxuXG4vLyBtYWluKClcbi8vICAgLnRoZW4oKHJlcykgPT4gY29uc29sZS5sb2cocmVzKSlcbi8vICAgLmNhdGNoKChlcnJvcikgPT4gY29uc29sZS5sb2coZXJyb3IuY29kZSkpO1xuIiwiLy8gTmV4dC5qcyBBUEkgcm91dGUgc3VwcG9ydDogaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvYXBpLXJvdXRlcy9pbnRyb2R1Y3Rpb25cbmNvbnN0IHsgY3JlYXRlVXNlciB9ID0gcmVxdWlyZSgnLi4vLi4vY29udHJvbGxlci91c2VyLmpzJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIocmVxLCByZXMpIHtcbiAgaWYgKHJlcS5tZXRob2QgPT09ICdQT1NUJykge1xuICAgIGNyZWF0ZVVzZXIocmVxLCByZXMpO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUubG9nKCdlcnJvcicpO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBVmFsaWRFbWFpbDogKGVtYWlsKSA9PiB7XG4gICAgY29uc3QgZW1haWxSZWdleCA9IC9eW15AXStAW15AXStcXC5bYS16QS1aXXsyLH0kL2k7XG4gICAgcmV0dXJuIGVtYWlsUmVnZXgudGVzdChlbWFpbCk7XG4gIH0sXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQHByaXNtYS9jbGllbnRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmNyeXB0XCIpOyJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJyZXF1aXJlIiwiaXNBVmFsaWRFbWFpbCIsImJjcnlwdCIsInByaXNtYSIsIm1vZHVsZSIsImV4cG9ydHMiLCJjcmVhdGVVc2VyIiwicmVxIiwicmVzcCIsImVtYWlsIiwibmFtZSIsInBhc3N3b3JkIiwiYm9keSIsInN0YXR1cyIsImpzb24iLCJtZXNzYWdlIiwicGFzc3dvcmRCY3J5cHQiLCJoYXNoU3luYyIsIm5ld1VzZXIiLCJ1c2VyIiwiY3JlYXRlIiwiZGF0YSIsImVycm9yIiwiY29kZSIsImhhbmRsZXIiLCJyZXMiLCJtZXRob2QiLCJjb25zb2xlIiwibG9nIiwiZW1haWxSZWdleCIsInRlc3QiXSwic291cmNlUm9vdCI6IiJ9