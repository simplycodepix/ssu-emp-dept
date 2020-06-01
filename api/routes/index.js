const routes = require('express').Router();
const crudRouter = require('./crud.router');
const userRouter = require('./user.router');

routes.use('/', crudRouter);
routes.use('/', userRouter);

module.exports = routes;