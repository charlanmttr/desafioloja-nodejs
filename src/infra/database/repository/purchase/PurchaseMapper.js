const clear = require('src/infra/support/ClearObject');

const PurchaseMapper = {

    toEntity(dataValues) {
        if (!dataValues) return null;
        const { product, paymentCondition: { inputValue, numberOfInstallments }, monthlyInterestRate, installmentValue, value } = dataValues;

        let purchase = {
            product,
            paymentCondition: {
                inputValue,
                numberOfInstallments
            },
            monthlyInterestRate,
            installmentValue,
            value
        };

        clear(purchase);

        return purchase;
    },

    toDatabase: (survivor) => {
        return survivor;
    }
};

module.exports = PurchaseMapper;
