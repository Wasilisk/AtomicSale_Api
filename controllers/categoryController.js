const {Category} = require('../models/models')
const ApiError = require('../error/ApiError')

class CategoryController {
    async create(req, res, next) {
        const {name} = req.body;
        const category = await Category.create({name});
        res.json(category);
    }

    async getAll(req, res, next) {
        const categories = await Category.findAll();
        res.json(categories);
    }
}

module.exports = new CategoryController()