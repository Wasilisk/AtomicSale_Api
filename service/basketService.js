const {Basket, BasketProduct, Product} = require("../models/models");

class BasketService {
    async createBasket(userId) {
        return await Basket.create({userId});
    }

    async addToBasket(userId, productId) {
        const userBasket = await Basket.findOne({where:{userId}})
        return await BasketProduct.create({basketId: userBasket.id, productId});
    }

    async deleteFromBasket(userId, productId) {
        const userBasket = await Basket.findOne({where:{userId}})
        await BasketProduct.destroy({where: {basketId: userBasket.id, productId}})
        return null;
    }

    async getBasketProducts(userId) {
        const userBasket = await Basket.findOne({where:{userId}})
        const allProducts = await BasketProduct.findAndCountAll({
            where: {basketId: userBasket.id},
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: [{
                model: Product,
                attributes: ['name', 'price', 'img']
            }]})

        return allProducts;
    }
}

module.exports = new BasketService()