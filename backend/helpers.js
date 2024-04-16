const jwt = require('jsonwebtoken');

exports.getUserIdWithToken = (authHeader) => {
    const token = authHeader.split(' ')[1];
    return jwt.verify(token, process.env.TOKEN_KEY).userId;
}

exports.normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };