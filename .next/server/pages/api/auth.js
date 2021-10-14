(() => {
var exports = {};
exports.id = "pages/api/auth";
exports.ids = ["pages/api/auth"];
exports.modules = {

/***/ "./config.js":
/*!*******************!*\
  !*** ./config.js ***!
  \*******************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const dotenv = __webpack_require__(/*! dotenv */ "dotenv");

if (true) {
  dotenv.config({
    path: '.env'
  });
}

exports.secret = process.env.JWT_SECRET || 'secret';

/***/ }),

/***/ "./controller/auth.js":
/*!****************************!*\
  !*** ./controller/auth.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  PrismaClient
} = __webpack_require__(/*! @prisma/client */ "@prisma/client");

const {
  isAValidEmail
} = __webpack_require__(/*! ../utils/utils */ "./utils/utils.js");

const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");

const jwt = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");

const prisma = new PrismaClient();

const {
  secret
} = __webpack_require__(/*! ../config */ "./config.js");

module.exports = {
  authenticateUser: async (req, resp) => {
    try {
      const {
        email,
        password
      } = req.body;

      if (!email || !password || !isAValidEmail(email)) {
        return resp.status(400).json({
          message: 'Bad Request'
        });
      }

      const user = await prisma.user.findUnique({
        where: {
          email: email
        }
      });

      if (user === null) {
        return resp.status(404).json({
          message: 'Not found'
        });
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (err) console.info(err);else if (!result) {
          return resp.status(404).json({
            message: 'contraseña incorrecta'
          });
        }
        jwt.sign({
          uid: user.id,
          email: user.email,
          name: user.name,
          password: user.password
        }, secret, {
          expiresIn: '2h'
        }, (err, token) => {
          if (err) {
            console.error(err);
          }

          return resp.status(200).json({
            token
          });
        });
      });
    } catch (error) {
      return resp.status(500).json({
        message: 'Internal server error'
      });
    }
  }
};

/***/ }),

/***/ "./pages/api/auth/index.js":
/*!*********************************!*\
  !*** ./pages/api/auth/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
const {
  authenticateUser
} = __webpack_require__(/*! ../../../controller/auth */ "./controller/auth.js");

async function handler(req, res) {
  if (req.method === 'POST') {
    authenticateUser(req, res);
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

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("dotenv");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("jsonwebtoken");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/api/auth/index.js"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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aUJBQU9YLElBQUksQ0FBQ0ksTUFBTCxDQUFZLEdBQVosRUFBaUJDLElBQWpCLENBQXNCO0FBQUVlLFlBQUFBO0FBQUYsV0FBdEIsQ0FBUDtBQUNELFNBZEg7QUFnQkQsT0FyQkQ7QUFzQkQsS0FqQ0QsQ0FpQ0UsT0FBT0MsS0FBUCxFQUFjO0FBQ2QsYUFBT3JCLElBQUksQ0FBQ0ksTUFBTCxDQUFZLEdBQVosRUFBaUJDLElBQWpCLENBQXNCO0FBQUVDLFFBQUFBLE9BQU8sRUFBRTtBQUFYLE9BQXRCLENBQVA7QUFDRDtBQUNGO0FBdENjLENBQWpCOzs7Ozs7Ozs7Ozs7Ozs7QUNSQSxNQUFNO0FBQUVSLEVBQUFBO0FBQUYsSUFBdUJkLG1CQUFPLENBQUMsc0RBQUQsQ0FBcEM7O0FBRWUsZUFBZXNDLE9BQWYsQ0FBdUJ2QixHQUF2QixFQUE0QndCLEdBQTVCLEVBQWlDO0FBQzlDLE1BQUl4QixHQUFHLENBQUN5QixNQUFKLEtBQWUsTUFBbkIsRUFBMkI7QUFDekIxQixJQUFBQSxnQkFBZ0IsQ0FBQ0MsR0FBRCxFQUFNd0IsR0FBTixDQUFoQjtBQUNELEdBRkQsTUFFTztBQUNMVixJQUFBQSxPQUFPLENBQUNZLEdBQVIsQ0FBWSxPQUFaO0FBQ0Q7QUFDRjs7Ozs7Ozs7OztBQ1JENUIsTUFBTSxDQUFDVixPQUFQLEdBQWlCO0FBQ2ZNLEVBQUFBLGFBQWEsRUFBR1EsS0FBRCxJQUFXO0FBQ3hCLFVBQU15QixVQUFVLEdBQUcsOEJBQW5CO0FBQ0EsV0FBT0EsVUFBVSxDQUFDQyxJQUFYLENBQWdCMUIsS0FBaEIsQ0FBUDtBQUNEO0FBSmMsQ0FBakI7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaGF0LWFwcC8uL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly9jaGF0LWFwcC8uL2NvbnRyb2xsZXIvYXV0aC5qcyIsIndlYnBhY2s6Ly9jaGF0LWFwcC8uL3BhZ2VzL2FwaS9hdXRoL2luZGV4LmpzIiwid2VicGFjazovL2NoYXQtYXBwLy4vdXRpbHMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAvZXh0ZXJuYWwgXCJAcHJpc21hL2NsaWVudFwiIiwid2VicGFjazovL2NoYXQtYXBwL2V4dGVybmFsIFwiYmNyeXB0XCIiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAvZXh0ZXJuYWwgXCJkb3RlbnZcIiIsIndlYnBhY2s6Ly9jaGF0LWFwcC9leHRlcm5hbCBcImpzb253ZWJ0b2tlblwiIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGRvdGVudiA9IHJlcXVpcmUoJ2RvdGVudicpO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgZG90ZW52LmNvbmZpZyh7IHBhdGg6ICcuZW52JyB9KTtcbn1cblxuZXhwb3J0cy5zZWNyZXQgPSBwcm9jZXNzLmVudi5KV1RfU0VDUkVUIHx8ICdzZWNyZXQnO1xuIiwiY29uc3QgeyBQcmlzbWFDbGllbnQgfSA9IHJlcXVpcmUoJ0BwcmlzbWEvY2xpZW50Jyk7XG5jb25zdCB7IGlzQVZhbGlkRW1haWwgfSA9IHJlcXVpcmUoJy4uL3V0aWxzL3V0aWxzJyk7XG5jb25zdCBiY3J5cHQgPSByZXF1aXJlKCdiY3J5cHQnKTtcbmNvbnN0IGp3dCA9IHJlcXVpcmUoJ2pzb253ZWJ0b2tlbicpO1xuY29uc3QgcHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpO1xuXG5jb25zdCB7IHNlY3JldCB9ID0gcmVxdWlyZSgnLi4vY29uZmlnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhdXRoZW50aWNhdGVVc2VyOiBhc3luYyAocmVxLCByZXNwKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgZW1haWwsIHBhc3N3b3JkIH0gPSByZXEuYm9keTtcbiAgICAgIGlmICghZW1haWwgfHwgIXBhc3N3b3JkIHx8ICFpc0FWYWxpZEVtYWlsKGVtYWlsKSkge1xuICAgICAgICByZXR1cm4gcmVzcC5zdGF0dXMoNDAwKS5qc29uKHsgbWVzc2FnZTogJ0JhZCBSZXF1ZXN0JyB9KTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcbiAgICAgICAgd2hlcmU6IHsgZW1haWw6IGVtYWlsIH0sXG4gICAgICB9KTtcbiAgICAgIGlmICh1c2VyID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiByZXNwLnN0YXR1cyg0MDQpLmpzb24oeyBtZXNzYWdlOiAnTm90IGZvdW5kJyB9KTtcbiAgICAgIH1cbiAgICAgIGJjcnlwdC5jb21wYXJlKHBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkLCAoZXJyLCByZXN1bHQpID0+IHtcbiAgICAgICAgaWYgKGVycikgY29uc29sZS5pbmZvKGVycik7XG4gICAgICAgIGVsc2UgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzcC5zdGF0dXMoNDA0KS5qc29uKHsgbWVzc2FnZTogJ2NvbnRyYXNlw7FhIGluY29ycmVjdGEnIH0pO1xuICAgICAgICB9XG4gICAgICAgIGp3dC5zaWduKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHVpZDogdXNlci5pZCxcbiAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICAgICAgbmFtZTogdXNlci5uYW1lLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IHVzZXIucGFzc3dvcmQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZWNyZXQsXG4gICAgICAgICAgeyBleHBpcmVzSW46ICcyaCcgfSxcbiAgICAgICAgICAoZXJyLCB0b2tlbikgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzcC5zdGF0dXMoMjAwKS5qc29uKHsgdG9rZW4gfSk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiByZXNwLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiAnSW50ZXJuYWwgc2VydmVyIGVycm9yJyB9KTtcbiAgICB9XG4gIH0sXG59O1xuIiwiY29uc3QgeyBhdXRoZW50aWNhdGVVc2VyIH0gPSByZXF1aXJlKCcuLi8uLi8uLi9jb250cm9sbGVyL2F1dGgnKTtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihyZXEsIHJlcykge1xuICBpZiAocmVxLm1ldGhvZCA9PT0gJ1BPU1QnKSB7XG4gICAgYXV0aGVudGljYXRlVXNlcihyZXEsIHJlcyk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0FWYWxpZEVtYWlsOiAoZW1haWwpID0+IHtcbiAgICBjb25zdCBlbWFpbFJlZ2V4ID0gL15bXkBdK0BbXkBdK1xcLlthLXpBLVpdezIsfSQvaTtcbiAgICByZXR1cm4gZW1haWxSZWdleC50ZXN0KGVtYWlsKTtcbiAgfSxcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAcHJpc21hL2NsaWVudFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiY3J5cHRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZG90ZW52XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpzb253ZWJ0b2tlblwiKTsiXSwibmFtZXMiOlsiZG90ZW52IiwicmVxdWlyZSIsImNvbmZpZyIsInBhdGgiLCJleHBvcnRzIiwic2VjcmV0IiwicHJvY2VzcyIsImVudiIsIkpXVF9TRUNSRVQiLCJQcmlzbWFDbGllbnQiLCJpc0FWYWxpZEVtYWlsIiwiYmNyeXB0Iiwiand0IiwicHJpc21hIiwibW9kdWxlIiwiYXV0aGVudGljYXRlVXNlciIsInJlcSIsInJlc3AiLCJlbWFpbCIsInBhc3N3b3JkIiwiYm9keSIsInN0YXR1cyIsImpzb24iLCJtZXNzYWdlIiwidXNlciIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImNvbXBhcmUiLCJlcnIiLCJyZXN1bHQiLCJjb25zb2xlIiwiaW5mbyIsInNpZ24iLCJ1aWQiLCJpZCIsIm5hbWUiLCJleHBpcmVzSW4iLCJ0b2tlbiIsImVycm9yIiwiaGFuZGxlciIsInJlcyIsIm1ldGhvZCIsImxvZyIsImVtYWlsUmVnZXgiLCJ0ZXN0Il0sInNvdXJjZVJvb3QiOiIifQ==