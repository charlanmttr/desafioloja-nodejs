const dataFaker = require('test/support/dataFaker/dataFaker');

const generateSinalizationPayload = quantity => {
    const objs = [];
    for (let index = 0; index < quantity; index++)
        objs.push(data());

    return objs;
};

const data = () => ({
    terminal_code: dataFaker.string({ min: 8, max: 8 }),
    version: dataFaker.string({ min: 6, max: 15 }),
    date_sent_terminal: dataFaker.date(),
    amount_return: dataFaker.integer({ min: 0, max: 15 }),
    limit_return: dataFaker.integer({ min: 0, max: 15 }),
    number_resends: dataFaker.integer({ min: 0, max: 15 }),
    start_date: dataFaker.date(),
    creation_date: dataFaker.date(),
    confirmation_date: dataFaker.date(),
    cancellation_date: dataFaker.date()
});

module.exports = { generateSinalizationPayload };
