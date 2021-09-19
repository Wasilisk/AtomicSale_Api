const Router = require('express').Router;
const reviewController = require('../controllers/reviewController')
const reviewRouter = new Router();
const checkRole = require('../middleware/checkRoleMiddleware')

reviewRouter.post('/', checkRole("USER"), reviewController.addRating);
reviewRouter.get('/', reviewController.getReviews);
reviewRouter.get('/info', reviewController.getRatingInfo)
reviewRouter.put('/', reviewController.updateReview)
reviewRouter.delete('/', reviewController.deleteRating);

module.exports = reviewRouter;