const joi = require('joi');

module.exports = () => ({
    create: joi.object().keys({
        name: joi.string().required(),
        valueUnitary: joi.number().required(),
        amount: joi.number().integer().required()
    })
});