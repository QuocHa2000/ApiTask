const express = require('express');
const route = express.Router();
const controller = require('../controllers/cart.controller');
const authEnterprise = require('../middleware/enterprise.middleware');
const loginMiddleware = require('../middleware/checkLogin.middleware');

route.get('/get/:id', controller.purchaseProduct);
route.get('/getorders', authEnterprise, controller.getOrder);
route.get('/finishorder/:id', loginMiddleware, controller.finishOrder);


module.exports = route;