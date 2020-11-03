module.exports = ({ purchaseService, productService, purchaseDomainService, logger }) => ({
    execute: async body => {
        try {
            const {
                product: productid,
                paymentCondition: {
                    inputValue,
                    numberOfInstallments
                }
            } = body;

            const productReceived = await productService.find(productid);
            if (!productReceived) throw ('product not found');

            const {
                amount: dbAmount,
                valueUnitary: dbValueUnitary 
            } = productReceived;
            if (dbAmount === 0) throw ('product out of stock');

            const purchase = purchaseDomainService.verifyInstallments(productid, dbValueUnitary, inputValue, numberOfInstallments);

            await Promise.all([
                purchaseService.create(purchase),
                productService.purchaseUpdate(productid, purchase.value)
            ]);

            return purchase;
        } catch (error) {
            logger.error(error.message);
            throw error;
        }
    }
});