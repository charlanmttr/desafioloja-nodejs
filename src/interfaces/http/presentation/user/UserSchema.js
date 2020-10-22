const joi = require('@hapi/joi')
    .extend(require('@hapi/joi-date'));

module.exports = () => ({
    create: joi.object().keys({
        name: joi.string().required(),
        email: joi.string().email().required(),
        birth_date: joi.date().format('YYYY-MM-DD').options({ convert: true }).raw().required()
    })
});