module.exports = ({ container }) => {
    const ctx = container.cradle;

    return [
        /**
         * @swagger
         * paths:
         *   /purchase:
         *     post:
         *       tags:
         *       - Purchase
         *       summary: "Add a new purchase to database"
         *       description: ""
         *       consumes:
         *       - "application/json"
         *       produces:
         *       - "application/json"
         *       parameters:
         *       - in: "body"
         *         name: "body"
         *         description: "Purchase data to be added to the database"
         *         required: true
         *         schema:
         *           $ref: "#/definitions/Purchase"
         *       responses:
         *          201:
         *            description: Purchase created with success.
         *            schema:
         *              $ref: '#/definitions/PurchaseReturn'  
         *          400:
         *            description: Bad Request.
         * definitions:
         *   Purchase:
         *     type: "object"
         *     properties:
         *       product:
         *         type: "string"
         *         required: true
         *       paymentConditions:
         *         type: "object"
         *         required: true
         *         properties:
         *           inputValue: 
         *             type: "double"
         *             required: true
         *             example: 200.00
         *           numberOfInstallments:
         *             type: "integer"
         *             required: true
         *             example: 12
         *   PurchaseReturn:
         *     type: object
         *     properties: 
         *        purchase: 
         *          type: object
         *          properties:
         *             numberOfInstallments:
         *               type: "integer"
         *               example: 12
         *             value:
         *               type: "double"
         *               example: 1000
         *             monthlyInterestRate:
         *               type: "double"
         *               example: 2.05
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
