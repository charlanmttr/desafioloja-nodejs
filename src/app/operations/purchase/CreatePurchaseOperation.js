module.exports = ({ productService, logger }) => ({
    execute: async body => {
        try {
            const { product: productId,
                paymentCondition: {
                    inputValue,
                    numberOfInstallments
                }
            } = body;

            const productReceived = await productService.find(productId);
            if (!productReceived) throw ('product not found');

            const {
                amount: dbAmount,
                valueUnitary: dbValueUnitary
            } = productReceived;

            if (dbAmount === 0) throw ('product out of stock');

            if (numberOfInstallments > 6) {
                const amountToPay = dbValueUnitary - inputValue;
                const rate = 2.05;

                const totalToPay = amountToPay * (1 + (rate / 100)) ** numberOfInstallments;
                const installmentValue = totalToPay / numberOfInstallments;

                console.log('O valor da primeira parcela será de', inputValue, ' e as', numberOfInstallments,
                    'restantes serão no valor de ', installmentValue.toFixed(2),
                    'reais. Resultando no total de', (totalToPay + inputValue).toFixed(2), 'reais.'
                );

            } else {
                const amountToPay = dbValueUnitary - inputValue;

                const installmentValue = amountToPay / numberOfInstallments;
                console.log('O valor das parcelas será de ', installmentValue, 'reais.');
            }

        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
});