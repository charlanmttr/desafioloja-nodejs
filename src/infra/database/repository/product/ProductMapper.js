const clear = require('src/infra/support/ClearObject');

const ProductMapper = {

    toEntity(dataValues) {
        if (!dataValues) return null;
        const { name, valueUnitary, lastSell: { date, value }, amount } = dataValues;

        let product = {
            name,
            valueUnitary,
            amount,
            lastSell: {
                date,
                value
            }
        };
        clear(product);

        return product;
    },

    toDatabase: (survivor) => {
        return survivor;
    }
};

module.exports = ProductMapper;
