module.exports = () => ({

    calculateValueWithInterest: (dbValueUnitary, inputValue, numberOfInstallments) => {
        const amountToPay = dbValueUnitary - inputValue;
        const rate = 2.25;

        const amountWithInterest = amountToPay * (1 + (rate / 100)) ** numberOfInstallments;
        const installmentValue = amountWithInterest / numberOfInstallments;
        const totalToPay = amountWithInterest + inputValue;

        return {
            inputValue,
            numberOfInstallments,
            installmentValue,
            totalToPay,
            rate
        };
    },

    calculateValueWithoutInterest: (totalToPay, inputValue, numberOfInstallments) => {
        const amountToPay = totalToPay - inputValue;
        const installmentValue = amountToPay / numberOfInstallments;

        return {
            inputValue,
            numberOfInstallments,
            installmentValue,
            totalToPay
        };
    },

    objectFactory: (product, purchase) => {
        const {
            inputValue,
            numberOfInstallments,
            installmentValue,
            totalToPay,
            rate
        } = purchase;

        return {
            product,
            paymentCondition: {
                inputValue,
                numberOfInstallments
            },
            monthlyInterestRate: rate || undefined,
            installmentValue: parseFloat(installmentValue.toFixed(2)),
            value: parseFloat(totalToPay.toFixed(2))
        };
    }
});