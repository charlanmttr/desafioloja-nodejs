module.exports = () => ({

    calculateValueWithInterest: (product, dbValueUnitary, inputValue, numberOfInstallments) => {
        const amountToPay = dbValueUnitary - inputValue;
        const rate = 2.05;

        const amountWithInterest = amountToPay * (1 + (rate / 100)) ** numberOfInstallments;
        const installmentValue = amountWithInterest / numberOfInstallments;
        const totalToPay = amountWithInterest + inputValue;
    
        console.log(`COM JUROS: O valor da primeira parcela será de ${inputValue} e as ${numberOfInstallments} restantes serão no valor de ${installmentValue.toFixed(2)} reais. Resultando no total de ${totalToPay.toFixed(2)} reais.`);
    
        return {
            product,
            paymentCondition: {
                inputValue,
                numberOfInstallments
            },
            monthlyInterestRate: rate,
            installmentValue,
            value: totalToPay
        };
    },

    calculateValueWithoutInterest: (product, dbValueUnitary, inputValue, numberOfInstallments) => {
        const amountToPay = dbValueUnitary - inputValue;
        const installmentValue = amountToPay / numberOfInstallments;

        console.log(`SEM JUROS: O valor das parcelas será de ${installmentValue} reais.`);

        return {
            product,
            paymentCondition: {
                inputValue,
                numberOfInstallments
            },
            installmentValue,
            value: dbValueUnitary
        };
    }
});