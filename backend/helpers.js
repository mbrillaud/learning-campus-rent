const jwt = require('jsonwebtoken');

exports.getUserIdWithToken = (authHeader) => {
    const token = authHeader.split(' ')[1];
    return jwt.verify(token, process.env.TOKEN_KEY).userId;
}