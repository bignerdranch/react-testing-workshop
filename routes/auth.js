const jwt = require('jsonwebtoken');
const { Router } = require('express');

const { cookieName, secret } = require('../config');

const authRoutes = Router();
const TWELVE_HOURS = 12 * 60 * 60 * 1000;

authRoutes.get('/current-user', (req, res) => {
  const cookie = req.cookies[cookieName];
  if (cookie) {
    try {
      const user = jwt.verify(cookie, secret, { algorithm: 'HS256' });
      res.json(user);
    } catch (error) {
      res.json({});
    }
  } else {
    res.json({});
  }
});

authRoutes.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username && password === 'pass') {
    const user = { access: ['guest', 'Guest'].includes(username) ? '' : 'associate', username };
    console.log(secret);
    const newToken = jwt.sign(user, secret, { algorithm: 'HS256' });
    console.log(newToken);
    res.cookie(cookieName, newToken, { maxAge: TWELVE_HOURS, httpOnly: true });
    res.json(user);
  } else {
    res.status(401).json({ error: 'Incorrect Username or Password.' });
  }
});

authRoutes.post('/logout', (req, res) => {
  res.cookie(cookieName, '', { maxAge: TWELVE_HOURS, httpOnly: true });
  res.send('Logged out');
});

module.exports = authRoutes;
