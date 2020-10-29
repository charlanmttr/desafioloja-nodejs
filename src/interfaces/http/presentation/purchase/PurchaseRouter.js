module.exports = ({ container }) => {
    const ctx = container.cradle;

    return [
        /**
         * @swagger
         *  purchases/:
         *   post:
         *      tags:
         *          - Purchase
         *      summary: This should create purchases.
         *      consumes:
         *        - application/json
         *      responses:
         *        200:
         *          description: Purchase return with success.
         *        400:
         *          description: Bad Request.
         */
        {
            method: 'post',
            path: '/',
            validation: {
                body: ctx.purchaseSchema.create,
            },
            handler: ctx.purchaseController.createPurchase
        }

    ];
};
