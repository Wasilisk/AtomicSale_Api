const {ProductInfo} = require("../models/models");

class ProductInfoService {
    async addProductInfo(product_id, general_information, features) {
        const info = await ProductInfo.create({
            general_information,
            features,
            productId: product_id
        })

        return info;
    }

    async updateProductInfo(product_id, general_information, features) {
        const info = await ProductInfo.findOne({where: {productId: product_id}})
        info.general_information = general_information;
        info.features = features;
        return await info.save();
    }

    async deleteProductInfo(product_id) {
        await ProductInfo.destroy({where: {productId: product_id}})
        return null;
    }
}

module.exports = new ProductInfoService()