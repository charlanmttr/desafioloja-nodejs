module.exports = ({ purchaseService, productService, purchaseFactory, logger }) => ({
    execute: async body => {
        try {
            const { product: productid,
                paymentCondition: {
                    inputValue,
                    numberOfInstallments
                }
            } = body;

            const productReceived = await productService.find(productid);
            if (!productReceived)
                throw ('product not found');

            const {
                amount: dbAmount,
                valueUnitary: dbValueUnitary
            } = productReceived;

            if (dbAmount === 0)
                throw ('product out of stock');

            let purchase;

            if (numberOfInstallments > 6) {
                purchase = purchaseFactory.calculateValueWithInterest(
                    productid,
                    dbValueUnitary,
                    inputValue,
                    numberOfInstallments
                );

            } else {
                purchase = purchaseFactory.calculateValueWithoutInterest(
                    productid,
                    dbValueUnitary,
                    inputValue,
                    numberOfInstallments
                );
            }

            const updateValues = purchaseFactory.productsUpdate(purchase.value);

            await Promise.all([
                purchaseService.create(purchase),
                productService.purchaseUpdate(productid, updateValues)
            ]);

            return purchase;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
});