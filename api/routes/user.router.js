const userRouter = require('express').Router();
const userController = require('../controllers/user.controller');

userRouter.route('/user/list')
    .get(userController.list);

userRouter.route('/user/login')
    .post(userController.login);

userRouter.route('/user/registration')
    .post(userController.registration);

userRouter.route('/user/:id')
    .get(userController.getUserData);

module.exports = userRouter;