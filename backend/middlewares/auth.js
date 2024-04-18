const jwt = require('jsonwebtoken');
const helpers = require('../helpers');

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        req.auth = {
            userId: helpers.getUserIdWithToken(authHeader),
            userStatus: helpers.getUserStatusWithToken(authHeader)
        };
        next();
    } catch(error) {
        res.status(401).json({error});
    }
};