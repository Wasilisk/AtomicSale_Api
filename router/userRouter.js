const Router = require('express').Router;
const userController = require('../controllers/userController')
const userRouter = new Router();
const {body} = require('express-validator')
const basketRouter = require('./basketRouter')

userRouter.use('/basket', basketRouter)
userRouter.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration);
userRouter.post('/login', userController.login);
userRouter.post('/logout', userController.logout);
userRouter.get('/activate/:link', userController.activate);
userRouter.get('/refresh', userController.refresh);

module.exports = userRouter;