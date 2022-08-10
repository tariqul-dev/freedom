const jwt = require('jsonwebtoken');
const createError = require('../utils/create_error');

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token)
        return next(createError(401, 'You are not authorized'));

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err)
            return next(createError(403, 'Token expired'));
        req.user = user;
        next();
    })

}

const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.params.id === req.user.id || req.user.isAdmin) {
            return next();
        } else {
            return next(createError(403, 'You are not authorized'));
        }
    });
}

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log(req.user);
        if (req.user.isAdmin) {

            return next();
        } else {
            return next(createError(403, 'You are not admin'));
        }
    });
}

module.exports = { verifyToken, verifyUser, verifyAdmin };