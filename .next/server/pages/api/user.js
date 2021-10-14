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
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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azovL2NoYXQtYXBwLy4vcGFnZXMvYXBpL3VzZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAvLi91dGlscy91dGlscy5qcyIsIndlYnBhY2s6Ly9jaGF0LWFwcC9leHRlcm5hbCBcIkBwcmlzbWEvY2xpZW50XCIiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAvZXh0ZXJuYWwgXCJiY3J5cHRcIiJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IFByaXNtYUNsaWVudCB9ID0gcmVxdWlyZSgnQHByaXNtYS9jbGllbnQnKTtcbmNvbnN0IHsgaXNBVmFsaWRFbWFpbCB9ID0gcmVxdWlyZSgnLi4vdXRpbHMvdXRpbHMnKTtcbmNvbnN0IGJjcnlwdCA9IHJlcXVpcmUoJ2JjcnlwdCcpO1xuY29uc3QgcHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpO1xuXG4vLyBjb25zdCBodHRwRXJyb3JzID0ge1xuLy8gICA0MDA6ICdCYWQgcmVxdWVzdCcsXG4vLyAgIDQwMTogJ1VuYXV0aG9yaXplZCcsXG4vLyAgIDQwMzogJ0ZvcmJpZGRlbicsXG4vLyAgIDQwNDogJ05vdCBmb3VuZCcsXG4vLyAgIDUwMDogJ0ludGVybmFsIHNlcnZlciBlcnJvcicsXG4vLyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3JlYXRlVXNlcjogYXN5bmMgKHJlcSwgcmVzcCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGVtYWlsLCBuYW1lLCBwYXNzd29yZCB9ID0gcmVxLmJvZHk7XG4gICAgICBpZiAoIWVtYWlsIHx8ICFwYXNzd29yZCB8fCAhbmFtZSB8fCAhaXNBVmFsaWRFbWFpbChlbWFpbCkpIHtcbiAgICAgICAgcmV0dXJuIHJlc3Auc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6ICdCYWQgcmVxdWVzdCcgfSk7XG4gICAgICB9XG4gICAgICBjb25zdCBwYXNzd29yZEJjcnlwdCA9IGJjcnlwdC5oYXNoU3luYyhwYXNzd29yZCwgMTApO1xuICAgICAgY29uc3QgbmV3VXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmNyZWF0ZSh7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBlbWFpbCxcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZEJjcnlwdCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlc3Auc3RhdHVzKDIwMCkuanNvbihuZXdVc2VyKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaWYgKGVycm9yLmNvZGUgPT09ICdQMjAwMicpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BcbiAgICAgICAgICAuc3RhdHVzKDQwMylcbiAgICAgICAgICAuanNvbih7IG1lc3NhZ2U6ICdGb3JiaWRkZW4sIGVtYWlsIGFscmVhZHkgZXhpc3RzJyB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXNwLnN0YXR1cyg1MDApLmpzb24oe1xuICAgICAgICBtZXNzYWdlOiAnSW50ZXJuYWwgc2VydmVyIGVycm9yJyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbn07XG4iLCIvLyBOZXh0LmpzIEFQSSByb3V0ZSBzdXBwb3J0OiBodHRwczovL25leHRqcy5vcmcvZG9jcy9hcGktcm91dGVzL2ludHJvZHVjdGlvblxuY29uc3QgeyBjcmVhdGVVc2VyIH0gPSByZXF1aXJlKCcuLi8uLi8uLi9jb250cm9sbGVyL3VzZXInKTtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihyZXEsIHJlcykge1xuICBpZiAocmVxLm1ldGhvZCA9PT0gJ1BPU1QnKSB7XG4gICAgY3JlYXRlVXNlcihyZXEsIHJlcyk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0FWYWxpZEVtYWlsOiAoZW1haWwpID0+IHtcbiAgICBjb25zdCBlbWFpbFJlZ2V4ID0gL15bXkBdK0BbXkBdK1xcLlthLXpBLVpdezIsfSQvaTtcbiAgICByZXR1cm4gZW1haWxSZWdleC50ZXN0KGVtYWlsKTtcbiAgfSxcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAcHJpc21hL2NsaWVudFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiY3J5cHRcIik7Il0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsInJlcXVpcmUiLCJpc0FWYWxpZEVtYWlsIiwiYmNyeXB0IiwicHJpc21hIiwibW9kdWxlIiwiZXhwb3J0cyIsImNyZWF0ZVVzZXIiLCJyZXEiLCJyZXNwIiwiZW1haWwiLCJuYW1lIiwicGFzc3dvcmQiLCJib2R5Iiwic3RhdHVzIiwianNvbiIsIm1lc3NhZ2UiLCJwYXNzd29yZEJjcnlwdCIsImhhc2hTeW5jIiwibmV3VXNlciIsInVzZXIiLCJjcmVhdGUiLCJkYXRhIiwiZXJyb3IiLCJjb2RlIiwiaGFuZGxlciIsInJlcyIsIm1ldGhvZCIsImNvbnNvbGUiLCJsb2ciLCJlbWFpbFJlZ2V4IiwidGVzdCJdLCJzb3VyY2VSb290IjoiIn0=