const jwt = require('jsonwebtoken');

const { cookieName, secret } = require('../config');

module.exports = (req, res, next) => {
  const cookie = req.cookies[cookieName];
  let user = {};
  if (cookie) {
    try {
      user = jwt.verify(cookie, secret, { algorithm: 'HS256' });
    } catch (error) {
      console.log('User Validation Error', error);
    }
  }
  if (user && user.access === 'associate') {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};
