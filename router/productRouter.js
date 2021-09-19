const Router = require('express').Router;
const productController = require('../controllers/productController')
const productRouter = new Router();
const checkRole = require('../middleware/checkRoleMiddleware')
const reviewRouter = require('./reviewRouter')

productRouter.use('/review', reviewRouter);
productRouter.post('/', checkRole("USER"), productController.createProduct);
productRouter.put('/:productId', productController.updateProduct);
productRouter.get('/',productController.getAll);
productRouter.get('/:productId', productController.getOne);
productRouter.delete('/:productId', productController.deleteProduct);

module.exports = productRouter;