module.exports = ({ purchaseFactory }) => ({

    verifyInstallments: (productid, dbValueUnitary, inputValue, numberOfInstallments) => {
        let purchase;

        if (numberOfInstallments > 6)
            purchase = purchaseFactory.calculateValueWithInterest(dbValueUnitary, inputValue, numberOfInstallments);
        else
            purchase = purchaseFactory.calculateValueWithoutInterest(dbValueUnitary, inputValue, numberOfInstallments);

        return purchaseFactory.objectFactory(productid, purchase);
    },

});