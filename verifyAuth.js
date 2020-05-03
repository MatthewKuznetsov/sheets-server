const jwt = require('jsonwebtoken')
const { privateKey } = require('./controllers/authController');

function verifyAuth(token) {
  try {
    return jwt.verify(
      token.split(' ')[1],
      privateKey
    );;
  } catch(err) {
    console.log(err);
    return false;
  }
}

module.exports = verifyAuth