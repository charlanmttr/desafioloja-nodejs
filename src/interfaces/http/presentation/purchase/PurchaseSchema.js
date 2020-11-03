const joi = require('joi');

module.exports = () => ({
    create: joi.object().keys({
        product: joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .messages({
                'string.base': '`id` must be a string',
                'string.pattern.base': '`id` need be a valid ObjectID',
                'any.required': '`id` is required'
            })
            .required(),
        paymentCondition: joi.object().keys({
            inputValue: joi.number()
                .min(0)
                .precision(2)
                .messages({
                    'number.base': '`inputValue` must be a number',
                    'number.min': '`inputValue` must be greater or equal than 0',
                    'number.precision': '`inputValue` must have no more than 2 decimal places.',
                    'any.required': '`inputValue` is required'
                })
                .required(),
            numberOfInstallments: joi.number()
                .integer()
                .min(1)
                .messages({
                    'number.base': '`numberOfInstallments` must be a number',
                    'number.integer': '`numberOfInstallments` must be a integer number',
                    'number.min': '`numberOfInstallments` must be greater or equal than 1',
                    'any.required': '`numberOfInstallments` is required'
                })
                .required(),
        })
    }),
});