const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const checkUpdateProduct = Joi.object().keys({
    amount: Joi.number().min(1).required(),
    productId: Joi.objectId().required()
})

module.exports.checkUpdateProduct = checkUpdateProduct;