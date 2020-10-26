module.exports = () => ({

    create({
        paymentCondition,
        value,
        monthlyInterestRate
    }) {

        return {
            purchase: {
                numberOfInstallments : paymentCondition.numberOfInstallments,
                value,
                monthlyInterestRate,
            }
        };
    },

});