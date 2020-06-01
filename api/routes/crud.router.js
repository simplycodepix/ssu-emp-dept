const crudRouter = require('express').Router();
const crudController = require('../controllers/crud.controller');

// Emp
crudRouter.route('/crud/emp/get')
    .get(crudController.getEmpTableData);

crudRouter.route('/crud/emp/getSingle')
    .get(crudController.getSingleEmp);

crudRouter.route('/crud/emp/add')
    .post(crudController.addEmp);

// Dept
crudRouter.route('/crud/dept/get')
    .get(crudController.getDeptTableData);

crudRouter.route('/crud/dept/getSingle')
    .get(crudController.getSingleDept);

crudRouter.route('/crud/dept/add')
    .post(crudController.addDept);

module.exports = crudRouter;