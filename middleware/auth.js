const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, config.secret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};
