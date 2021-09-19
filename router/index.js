const Router = require('express').Router;
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const categoryRouter = require('./categoryRouter')

const router = new Router();

router.use('/user', userRouter);
router.use('/product', productRouter)
router.use('/category', categoryRouter)

module.exports = router;