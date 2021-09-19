const ApiError = require("../error/ApiError");
const {Sequelize} = require("sequelize");
const {ProductReview} = require("../models/models");

class RatingService {
    async addReview(productId, userId, rate, message) {
        const checkRating = await ProductReview.findOne({where: {userId, productId}})
        if (!checkRating) {
            let newRating = ProductReview.create({rate, message, userId, productId})
            return newRating
        } else {
            throw ApiError.badRequest("Користувач не може додавати більше одного відгуку на продукт !")
        }
    }

    async getReview(userId, productId, page, limit) {
        let offset = page * limit - limit
        let reviews = await ProductReview.findAndCountAll({where: {productId}, limit, offset});
        let yourReview = await ProductReview.findOne({
            where: {userId, productId},
            attributes: ['rate', 'message', 'createdAt']
        });
        console.log(yourReview)
        console.log(reviews)
        reviews.yourReview = yourReview.dataValues;
        console.log(reviews)
        return reviews;
    }

    async getRatingInfo(productId) {
        const ratingReview = await ProductReview.findAll({
            where: {productId},
            attributes: [
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'ratingCount'],
                [Sequelize.fn('AVG', Sequelize.col('rate')), 'ratingAvg']
            ],
        });

        return ratingReview;
    }

    async getRatingCountByRate(productId, rateValue) {
        const ratingCount = await ProductReview.findAll({
            where: {productId, rate: rateValue},
            attributes: [
                [Sequelize.fn('COUNT', Sequelize.col('id')), `${rateValue}`],
            ],
        });
        return ratingCount;
    }

    async updateReview(productId, userId, rate, message) {
        const updateReview = await ProductReview.findOne({where: {productId, userId}})
        updateReview.rate = rate;
        updateReview.message = message;
        return await updateReview.save();
    }

    async deleteReview(productId, userId) {
        await ProductReview.destroy({where: {productId, userId}})
        return null;
    }

}

module.exports = new RatingService()