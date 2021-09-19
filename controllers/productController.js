const {Product, ProductInfo, Rating} = require('../models/models')
const ApiError = require('../error/ApiError')
const productService = require('../service/productService')
const productInfoService = require('../service/productInfoService')

class ProductController {
    async createProduct(req, res, next) {
        try {
            const {name, description, price, categoryId, info} = req.body;
            const {img} = req.files;
            const newProduct = await productService.addNewProduct(name, description, price, categoryId, info, img)
            return res.json(newProduct)
        } catch (e) {
            next(ApiError.badRequest("Не вдалось створити продукт"))
        }
    }

    async updateProduct(req, res, next) {
        try {
            const {id} = req.params;
            let {name, description, price, categoryId, info} = req.body;
            const {img} = req.files;
            const newProduct = await productService.updateProduct(id, name, description, price, categoryId, info, img)

            return res.json(newProduct)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {categoryId, limit, page} = req.query
        page = page || 1
        limit = limit || 10
        const products = await productService.getAllProducts(categoryId, page, limit)
        res.json(products)
    }

    async getOne(req, res) {
        const {id} = req.params
        const product = await Product.findOne(
            {
                where: {id},
                include: [{model: ProductInfo},{model: Rating}]
            }
        )
        return res.json(product)
    }

    async deleteProduct(req, res, next) {
        try {
            const {id} = req.params
            await productService.deleteProduct(id)
            await productInfoService.deleteProductInfo(id)

            return res.json("Product deleted")
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new ProductController()