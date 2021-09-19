const ApiError = require('../error/ApiError')
const ratingService = require('../service/ratingService')

class ReviewController {
    async addRating(req, res, next) {
        try {
            const {rate, message, userId, productId} = req.body;
            const newReview = await ratingService.addReview(productId, userId, rate, message)
            return res.json(newReview)
        } catch (e) {
            next(e)
        }
    }

    async updateReview(req, res, next) {
        try {
            const {rate, message, userId, productId} = req.body;
            const updateReview = await ratingService.updateReview(productId, userId, rate, message)
            return res.json(updateReview)
        } catch (e) {
            next(e)
        }
    }

    async deleteRating(req, res, next) {
        try {
            const {userId, productId} = req.body;
            await ratingService.deleteReview(productId, userId)
        } catch (e) {
            next(e)
        }
    }

    async getReviews(req, res, next) {
        try {
            let {userId, productId, limit, page} = req.query;
            page = page || 1
            limit = limit || 10
            let allReviews = await ratingService.getReview(userId, productId, page, limit)
            res.json(allReviews)
        } catch (e) {
            next(e)
        }
    }

    async getRatingInfo(req, res, next) {
        try {
            const {productId} = req.query;
            let ratingInfo = await ratingService.getRatingInfo(productId);
            ratingInfo[0].dataValues.rateCount = [];
            for (let i = 5; i > 0; i--) {
                let rateCount = await ratingService.getRatingCountByRate(productId, i)
                ratingInfo[0].dataValues.rateCount.push(rateCount[0].dataValues);
            }
            res.json(ratingInfo);
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new ReviewController()