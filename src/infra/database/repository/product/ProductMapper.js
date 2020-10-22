const clear = require('src/infra/support/ClearObject');

const ProductMapper = {
    toEntity(dataValues) {
        if (!dataValues) return null;
        const { name, valueUnitary, amount } = dataValues;

        let product = {
            name,
            valueUnitary,
            amount
        };

        clear(product);

        return product;
    },

    toDatabase: (survivor) => {
        return survivor;
    }
};

module.exports = ProductMapper;
