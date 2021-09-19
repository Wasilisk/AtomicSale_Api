const jwt = require('jsonwebtoken')
const {UserToken} = require('../models/models')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET,{expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET,{expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET_SECRET)
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await UserToken.findOne({where: {userId}})
        if(tokenData) {
            tokenData.refresh_token = refreshToken;
             return tokenData.save()
        }
        const token = await UserToken.create({userId: userId, refresh_token: refreshToken})
        return token;
    };

    async removeToken(refreshToken) {
        const tokenData = await UserToken.destroy({where: {refresh_token: refreshToken}})
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await UserToken.findOne({where: {refreshToken}})
        return tokenData;
    }
}

module.exports = new TokenService()