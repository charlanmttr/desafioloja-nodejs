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
            if (!productReceived) 
                throw ('product not found');

            const {
                amount: dbAmount,
                valueUnitary: dbValueUnitary
            } = productReceived;

            if (dbAmount === 0) 
                throw ('product out of stock');
            
            let purchasePayload;
            
            if (numberOfInstallments > 6) {
                purchasePayload = purchaseFactory.calculateValueWithInterest(
                    productId,
                    dbValueUnitary,
                    inputValue,
                    numberOfInstallments
                );
  
            } else {
                purchasePayload = purchaseFactory.calculateValueWithoutInterest(
                    productId,
                    dbValueUnitary,
                    inputValue,
                    numberOfInstallments
                );
            }

            return purchaseService.create(purchasePayload);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
});