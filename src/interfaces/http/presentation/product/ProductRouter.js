module.exports = ({ container }) => {
    const ctx = container.cradle;

    return [
        /**
         * @swagger
         * paths:
         *   /products:
         *     post:
         *       tags:
         *       - Product
         *       summary: "Add a new product to database"
         *       description: ""
         *       consumes:
         *       - "application/json"
         *       produces:
         *       - "application/json"
         *       parameters:
         *       - in: "body"
         *         name: "body"
         *         description: "Product object that needs to be added to the database"
         *         required: true
         *         schema:
         *           $ref: "#/definitions/Product"
         *       responses:
         *          200:
         *            description: Product return with success.
         *          400:
         *            description: Bad Request.
         *     get:
         *       tags:
         *       - Product
         *       summary: Get a list of products.
         *       description: ""
         *       produces:
         *       - applications/json
         *       responses: 
         *          200:
         *            description: Products list response.
         *          204:
         *            description: No content.
         *          400: 
         *            description: Bad Request.
         * 
         *   /products/{id}:
         *     get:
         *       tags:
         *       - Product
         *       summary: Get a Product by ID.
         *       description: ""
         *       produces:
         *       - "application/json"
         *       parameters:
         *       - name: "_id"
         *         in: "path"
         *         description: "id of product to return"
         *         required: true
         *         type: "string"
         *       responses:
         *          200:
         *            description: Products list response.
         * 
         *   /products/search:
         *     get:
         *       tags:
         *       - Product
         *       summary: Get a list of products by filtering the minimum and maximum price.
         *       description: ""
         *       produces: 
         *       - "application/json"
         *       parameters:
         *       - in: query
         *         name: "min_price"
         *         description: "minimum value to be searched" 
         *         required: false
         *         type: double  
         *       - in: query
         *         name: "max_price"
         *         description: "maximum value to be searched" 
         *         required: false
         *         type: double  
         *       responses:
         *         200:
         *           description: Products list response.
         * definitions:
         *   Product:
         *     type: "object"
         *     required:
         *     - "name"
         *     - "valueUnitary"
         *     - "amount"
         *     properties:
         *     name:
         *         type: "string"
         *     valueUnitary:
         *         type: "string"
         *     amount:
         *         type: "integer"
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
                query: ctx.productSchema.querySchema
            },
            handler: ctx.productController.searchProduct
        },
        {
            method: 'get',
            path: '/:id',
            validation: {
                params: ctx.productSchema.validateId
            },
            handler: ctx.productController.findProduct
        },

    ];
};
