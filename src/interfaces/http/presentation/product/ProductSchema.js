const joi = require('joi');

module.exports = () => ({
    create: joi.object().keys({
        product: joi.object().keys({
            name: joi.string()
                .messages({
                    'any.required': '`name` is required'
                })
                .required(),
            valueUnitary: joi.number()
                .greater(0)
                .precision(2)
                .messages({
                    'number.base': '`valueUnitary` must be a number',
                    'number.greater': '`valueUnitary` must be greater than 0',
                    'number.precision': '`valueUnitary` must have no more than 2 decimal places.',
                    'any.required': '`valueUnitary` is required'
                })
                .required(),
            amount: joi.number()
                .integer()
                .min(1)
                .messages({
                    'number.base': '`amount` must be a number',
                    'number.integer': '`amount` must be a integer number',
                    'number.min': '`amount` must be greater or equal than 1',
                    'any.required': '`amount` is required'
                })
                .required(),
        })
    }),

    querySchema: joi.object().keys({
        min_price: joi.number()
            .min(0)
            .max(50000)
            .messages({
                'number.base': '`min_price` must be a number',
                'number.min': '`min_price` must be greater than or equal to 0',
                'number.max': '`min_price` must be less than or equal to 50000'
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
                'string.base': '`id` must be a string',
                'string.pattern.base': '`id` need be a valid ObjectID',
                'any.required': '`id` is required'
            })
            .required(),
    })

});