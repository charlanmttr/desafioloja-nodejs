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
            .min(0)
            .messages({
                'number.base': '`min_price` must be a number',
                'number.min': '`min_price` must be greater than or equal to 0'
            }),
        max_price: joi.number()
            .min(0)
            .messages({
                'number.base': '`max_price` must be a number',
                'number.min': '`max_price` must be greater than or equal to 0'
            }),
    }).or('min_price', 'max_price')
        .when(joi.object({
            min_price: joi.exist(),
            max_price: joi.exist()
        }), {
            then: joi.object({
                max_price: joi.number().greater(joi.ref('min_price'))
            }),
        })
        .messages({
            'object.missing': 'Must contain at least one field on query',
            'number.greater': '`max_price` must be greater than `min_price`'
        })
        .strict(false),

    validateId: joi.object().keys({
        id: joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .messages({
                'string.pattern.base': 'ID need be a valid ObjectID',
                'any.required': 'ID params is required'
            })
    })

});