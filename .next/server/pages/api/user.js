(() => {
var exports = {};
exports.id = "pages/api/user";
exports.ids = ["pages/api/user"];
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

/***/ "./pages/api/user/index.js":
/*!*********************************!*\
  !*** ./pages/api/user/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const {
  createUser
} = __webpack_require__(/*! ../../../controller/user */ "./controller/user.js");

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
var __webpack_exports__ = (__webpack_exec__("./pages/api/user/index.js"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FDQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaGF0LWFwcC8uL2NvbnRyb2xsZXIvdXNlci5qcyIsIndlYnBhY2s6Ly9jaGF0LWFwcC8uL3BhZ2VzL2FwaS91c2VyL2luZGV4LmpzIiwid2VicGFjazovL2NoYXQtYXBwLy4vdXRpbHMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAvZXh0ZXJuYWwgXCJAcHJpc21hL2NsaWVudFwiIiwid2VicGFjazovL2NoYXQtYXBwL2V4dGVybmFsIFwiYmNyeXB0XCIiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBQcmlzbWFDbGllbnQgfSA9IHJlcXVpcmUoJ0BwcmlzbWEvY2xpZW50Jyk7XG5jb25zdCB7IGlzQVZhbGlkRW1haWwgfSA9IHJlcXVpcmUoJy4uL3V0aWxzL3V0aWxzJyk7XG5jb25zdCBiY3J5cHQgPSByZXF1aXJlKCdiY3J5cHQnKTtcbmNvbnN0IHByaXNtYSA9IG5ldyBQcmlzbWFDbGllbnQoKTtcblxuLy8gY29uc3QgaHR0cEVycm9ycyA9IHtcbi8vICAgNDAwOiAnQmFkIHJlcXVlc3QnLFxuLy8gICA0MDE6ICdVbmF1dGhvcml6ZWQnLFxuLy8gICA0MDM6ICdGb3JiaWRkZW4nLFxuLy8gICA0MDQ6ICdOb3QgZm91bmQnLFxuLy8gICA1MDA6ICdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InLFxuLy8gfTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZVVzZXI6IGFzeW5jIChyZXEsIHJlc3ApID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBlbWFpbCwgbmFtZSwgcGFzc3dvcmQgfSA9IHJlcS5ib2R5O1xuICAgICAgaWYgKCFlbWFpbCB8fCAhcGFzc3dvcmQgfHwgIW5hbWUgfHwgIWlzQVZhbGlkRW1haWwoZW1haWwpKSB7XG4gICAgICAgIHJldHVybiByZXNwLnN0YXR1cyg0MDApLmpzb24oeyBtZXNzYWdlOiAnQmFkIHJlcXVlc3QnIH0pO1xuICAgICAgfVxuICAgICAgY29uc3QgcGFzc3dvcmRCY3J5cHQgPSBiY3J5cHQuaGFzaFN5bmMocGFzc3dvcmQsIDEwKTtcbiAgICAgIGNvbnN0IG5ld1VzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5jcmVhdGUoe1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgZW1haWwsXG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRCY3J5cHQsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXNwLnN0YXR1cygyMDApLmpzb24obmV3VXNlcik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmIChlcnJvci5jb2RlID09PSAnUDIwMDInKSB7XG4gICAgICAgIHJldHVybiByZXNwXG4gICAgICAgICAgLnN0YXR1cyg0MDMpXG4gICAgICAgICAgLmpzb24oeyBtZXNzYWdlOiAnRm9yYmlkZGVuLCBlbWFpbCBhbHJlYWR5IGV4aXN0cycgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzcC5zdGF0dXMoNTAwKS5qc29uKHtcbiAgICAgICAgbWVzc2FnZTogJ0ludGVybmFsIHNlcnZlciBlcnJvcicsXG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG59O1xuXG4vLyBhc3luYyBmdW5jdGlvbiBtYWluKCkge1xuLy8gICBjb25zdCBuZXdVc2VyID0gYXdhaXQgcHJpc21hLnVzZXIuY3JlYXRlKHtcbi8vICAgICBkYXRhOiB7XG4vLyAgICAgICBlbWFpbDogJ2FsaWNlQGdtYWlsLmNvbScsXG4vLyAgICAgICBuYW1lOiAnQWxpY2UnLFxuLy8gICAgICAgcGFzc3dvcmQ6ICcxMjM0NTY3OHEnLFxuLy8gICAgIH0sXG4vLyAgIH0pO1xuLy8gICByZXR1cm4gbmV3VXNlcjtcbi8vIH1cblxuLy8gbWFpbigpXG4vLyAgIC50aGVuKChyZXMpID0+IGNvbnNvbGUubG9nKHJlcykpXG4vLyAgIC5jYXRjaCgoZXJyb3IpID0+IGNvbnNvbGUubG9nKGVycm9yLmNvZGUpKTtcbiIsIi8vIE5leHQuanMgQVBJIHJvdXRlIHN1cHBvcnQ6IGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL2FwaS1yb3V0ZXMvaW50cm9kdWN0aW9uXG5jb25zdCB7IGNyZWF0ZVVzZXIgfSA9IHJlcXVpcmUoJy4uLy4uLy4uL2NvbnRyb2xsZXIvdXNlcicpO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKHJlcSwgcmVzKSB7XG4gIGlmIChyZXEubWV0aG9kID09PSAnUE9TVCcpIHtcbiAgICBjcmVhdGVVc2VyKHJlcSwgcmVzKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZygnZXJyb3InKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzQVZhbGlkRW1haWw6IChlbWFpbCkgPT4ge1xuICAgIGNvbnN0IGVtYWlsUmVnZXggPSAvXlteQF0rQFteQF0rXFwuW2EtekEtWl17Mix9JC9pO1xuICAgIHJldHVybiBlbWFpbFJlZ2V4LnRlc3QoZW1haWwpO1xuICB9LFxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBwcmlzbWEvY2xpZW50XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJjcnlwdFwiKTsiXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwicmVxdWlyZSIsImlzQVZhbGlkRW1haWwiLCJiY3J5cHQiLCJwcmlzbWEiLCJtb2R1bGUiLCJleHBvcnRzIiwiY3JlYXRlVXNlciIsInJlcSIsInJlc3AiLCJlbWFpbCIsIm5hbWUiLCJwYXNzd29yZCIsImJvZHkiLCJzdGF0dXMiLCJqc29uIiwibWVzc2FnZSIsInBhc3N3b3JkQmNyeXB0IiwiaGFzaFN5bmMiLCJuZXdVc2VyIiwidXNlciIsImNyZWF0ZSIsImRhdGEiLCJlcnJvciIsImNvZGUiLCJoYW5kbGVyIiwicmVzIiwibWV0aG9kIiwiY29uc29sZSIsImxvZyIsImVtYWlsUmVnZXgiLCJ0ZXN0Il0sInNvdXJjZVJvb3QiOiIifQ==