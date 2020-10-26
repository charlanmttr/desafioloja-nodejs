module.exports = () => ({
    toPurchaseDatabase: ( product, inputValue, numberOfInstallments, installmentValue, totalToPay, monthlyInterestRate = undefined ) => {
        
        const purchase = {
            product,
            paymentCondition: {
                inputValue,
                numberOfInstallments
            },
            monthlyInterestRate,
            installmentValue,
            value: totalToPay
        };

        return purchase;
    }
});