const uuid = require('uuid')
const path = require('path')
const {Product} = require('../models/models');
const productInfoService = require('./productInfoService')

class ProductService {
    async addNewProduct(name, description, price, categoryId, info, img) {
        let fileName = uuid.v4() + ".jpg"
        await img.mv(path.resolve(__dirname, '..', 'static', fileName))
        const product = await Product.create({name, price, description, categoryId, img: fileName})
        let product_info;
        if(info) {
            info = JSON.parse(info)
            product_info = await productInfoService.addProductInfo(product.id, info.general_information, info.features)
        }
        return product;
    }

    async updateProduct(id, name, description, price, categoryId, info, img) {
        const updateProduct = await Product.findOne({where: {id}})
        let updateProductInfo;
        if(info) {
            info = JSON.parse(info)
            updateProductInfo = await productInfoService.updateProductInfo(id, info.general_information, info.features)
        }
        if(img !== updateProduct.img) {
            let fileName = uuid.v4() + ".jpg";
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))
            updateProduct.img = fileName;
        }
        updateProduct.name = name;
        updateProduct.description = description;
        updateProduct.price = price;
        return await updateProduct.save();
    }

    async getAllProducts(categoryId, page, limit) {
        let offset = page * limit - limit
        let products
        if(!categoryId) {
            products = await Product.findAndCountAll({limit, offset})
        } else {
            products = await Product.findAndCountAll({where:{categoryId}, limit, offset})
        }

        return products;
    }

    async deleteProduct(id) {
        await Product.destroy({where: {id}})
        return null;
    }
}

module.exports = new ProductService()