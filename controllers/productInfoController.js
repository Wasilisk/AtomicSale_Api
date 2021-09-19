const ApiError = require('../error/ApiError')
const productInfoService = require('../service/productInfoService')

class ProductInfoController {
    async addInfo(req, res, next) {
        try {
            const {productId} = req.params
            const {general_information, features} = req.body
            const productInfo = await productInfoService.addProductInfo(productId, general_information, features)

            return res.json(productInfo)
        } catch (e) {
            next(e)
        }
    }

    async updateInfo(req, res, next) {
        try {
            const {productId} = req.params
            const {general_information, features} = req.body
            const updateProductInfo = await productInfoService.updateProductInfo(productId, general_information, features)

            return res.json(updateProductInfo)
        } catch (e) {
            next(e)
        }
    }

    async deleteInfo(req, res, next) {
        try {
            const {productId} = req.params
            await productInfoService.deleteProductInfo(productId)

            return res.json("Product info deleted")
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new ProductInfoController()