const jwt = require('jsonwebtoken')
const ApiError = require("../error/ApiError");
const tokenService = require('../service/tokenService')

module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            const accessToken = req.headers.authorization.split(' ')[1]
            if (!accessToken) {
                return next(ApiError.UnautorizedError())
            }
            const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
            if (decoded.role !== role) {
                return res.status(403).json({message: "У вас немає доступу"})
            }
            const userData = tokenService.validateAccessToken(accessToken)
            if (!userData) {
                return next(ApiError.UnautorizedError())
            }

            req.user = userData;
            next()
        } catch (e) {
            return next(ApiError.UnautorizedError())
        }
    }
}
