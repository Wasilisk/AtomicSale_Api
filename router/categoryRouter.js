const Router = require('express').Router;
const categoryController = require('../controllers/categoryController')
const categoryRouter = new Router();

categoryRouter.post('/', categoryController.create);
categoryRouter.get('/', categoryController.getAll);

module.exports = categoryRouter;