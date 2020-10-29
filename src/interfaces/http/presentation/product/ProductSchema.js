const joi = require('joi');

module.exports = () => ({
    create: joi.object().keys({
        name: joi.string()
            .required()
            .messages({
                'any.required': '`name` is required'
            }),
        valueUnitary: joi.number()
            .greater(0)
            .required()
            .messages({
                'number.base': '`valueUnitary` must be a number',
                'number.greater': '`valueUnitary` must be greater than 0',
                'any.required': '`valueUnitary` is required'
            }),
        amount: joi.number()
            .integer()
            .min(1)
            .required()
            .messages({
                'number.base': '`amount` must be a number',
                'number.integer': '`amount` must be a integer number',
                'number.min': '`amount` must be greater or equal than 1',
                'any.required': '`amount` is required'
            }),
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
            .required()
            .messages({
                'string.base': '`id` must be a string',
                'string.pattern.base': '`id` need be a valid ObjectID',
                'any.required': '`id` is required'
            })
    })

});