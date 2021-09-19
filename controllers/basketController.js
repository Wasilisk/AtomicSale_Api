const ApiError = require('../error/ApiError');
const basketService = require('../service/basketService');

class BasketController {
    async getBasketProducts(req, res, next) {
        try {
            const {userId} = req.query;
            const basketProducts = await basketService.getBasketProducts(userId);
            res.json(basketProducts)
        } catch (e) {
            next(e)
        }
    }

    async addProductToBasket(req, res, next) {
        try {
            const {userId, productId} = req.body;
            const newBasketProduct = await basketService.addToBasket(userId, productId);
            res.json(newBasketProduct)
        } catch (e) {
            next(e)
        }
    }

    async deleteFromBasket(req, res, next) {
        try {
            const {userId, productId} = req.query;
            await basketService.deleteFromBasket(userId, productId);
            res.json("Продукт видалено");
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new BasketController()