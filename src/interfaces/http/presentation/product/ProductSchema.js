const joi = require('joi');

module.exports = () => ({
    create: joi.object().keys({
        name: joi.string()
            .required(),
        valueUnitary: joi.number()
            .required(),
        amount: joi.number()
            .integer()
            .required()
    }),

    querySchema: joi.object().keys({
        min_price: joi.number()
            .messages({ 'number.base': '`min_price` must be a number' }),
        max_price: joi.number()
            .messages({ 'number.base': '`max_price` must be a number' }),
    }).or('min_price', 'max_price')
        .messages({ 'object.missing': 'Must contain at least one field on query' }),
});