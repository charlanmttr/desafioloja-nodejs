module.exports = ({ container }) => {
    const ctx = container.cradle;

    return [
        /**
         * @swagger
         *  products/:
         *   post:
         *      tags:
         *          - Product
         *      summary: This should create products.
         *      consumes:
         *        - application/json
         *      responses:
         *        200:
         *          description: Product return with success.
         *        400:
         *          description: Bad Request.
         */
        {
            method: 'post',
            path: '/',
            validation: {
                body: ctx.productSchema.create,
            },
            handler: ctx.productController.createProduct
        },

        {
            method: 'get',
            path: '/',
            validation: {},
            handler: ctx.productController.listProducts
        },

        {
            method: 'get',
            path: '/search',
            validation: {
                // query: ctx.productSchema.query
            },
            handler: ctx.productController.searchProduct
        },
    ];
};
