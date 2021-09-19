const Router = require('express').Router;
const basketController = require('../controllers/basketController')
const basketRouter = new Router();

basketRouter.post('/', basketController.addProductToBasket);
basketRouter.get('/', basketController.getBasketProducts);
basketRouter.delete('/', basketController.deleteFromBasket)

module.exports = basketRouter;