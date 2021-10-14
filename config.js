const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env' });
}

exports.secret = process.env.JWT_SECRET || 'secret';
