const tokenService = require('../service/tokenService')
const ApiError = require('../error/ApiError')


module.exports = function (req, res, next) {
    if(req.method === 'OPTIONS') {
        next()
    }
    try {
        const accessToken = req.headers.authorization.split(' ')[1]
        if(!accessToken) {
            return next(ApiError.UnautorizedError())
        }
        const userData = tokenService.validateAccessToken(accessToken)
        if(!userData) {
            return next(ApiError.UnautorizedError())
        }

        req.user = userData;
        next()
    } catch (e) {
        return next(ApiError.UnautorizedError())
    }
}