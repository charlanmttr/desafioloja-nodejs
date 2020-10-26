module.exports = ({ purchaseService, productService, purchaseFactory, logger }) => ({
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

                const amountWithInterest = amountToPay * (1 + (rate / 100)) ** numberOfInstallments;
                const installmentValue = amountWithInterest / numberOfInstallments;
                const totalToPay = amountWithInterest + inputValue;

                console.log(`COM JUROS: O valor da primeira parcela será de ${inputValue} e as ${numberOfInstallments} restantes serão no valor de ${installmentValue.toFixed(2)} reais. Resultando no total de ${totalToPay.toFixed(2)} reais.`);

                let purchasePayload = purchaseFactory.toPurchaseDatabase(productId, inputValue, numberOfInstallments, installmentValue, totalToPay, rate);
                
                return purchaseService.create(purchasePayload);
            } else {
                const amountToPay = dbValueUnitary - inputValue;

                const installmentValue = amountToPay / numberOfInstallments;
                console.log(`SEM JUROS: O valor das parcelas será de ${installmentValue} reais.`);

                let purchasePayload = purchaseFactory.toPurchaseDatabase(productId, inputValue, numberOfInstallments, installmentValue, dbValueUnitary);

                return purchaseService.create(purchasePayload);
            }

        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
});