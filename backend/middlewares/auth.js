const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const userId = jwt.verify(token, process.env.TOKEN_KEY).userId;
        const userStatus = jwt.verify(token, process.env.TOKEN_KEY).userStatus;

        req.auth = {
            userId: userId,
            userStatus: userStatus
        };
        next();
    } catch(error) {
        res.status(401).json({error});
    }
};