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
         *         description: "Product object to be added to the database"
         *         required: true
         *         type: object
         *         properties:
         *           product:
         *             $ref: "#/definitions/BasicProduct"
         *       responses:
         *         201:
         *           description: Product created with success.
         *           schema:
         *             type: object
         *             properties:
         *               product:
         *                 $ref: "#/definitions/BasicProduct"
         *         400:
         *           description: Bad Request.
         *     get:
         *       tags:
         *       - Product
         *       summary: Get a list of products.
         *       description: ""
         *       produces:
         *       - applications/json
         *       responses: 
         *         200:
         *           description: Products list response.
         *           schema:
         *             $ref: '#/definitions/Products'
         *         204:
         *           description: No content on database.
         *         400: 
         *           description: Bad Request.
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
         *           schema:
         *             $ref: '#/definitions/Products'
         *         204:
         *           description: No products matching the requested filter.
         *         400:
         *           description: Bad request.
         *   /products/{id}:
         *     get:
         *       tags:
         *       - Product
         *       summary: Get a product by ObjectID.
         *       description: ""
         *       produces:
         *       - "application/json"
         *       parameters:
         *       - name: "id"
         *         in: "path"
         *         description: "`ObjectID` of the product to be returned."
         *         required: true
         *         type: "string"
         *       responses:
         *         200:
         *           description: Product requested.
         *           schema:
         *             $ref: '#/definitions/CompleteProduct'  
         *         204:
         *           description: No products found with this ObjectID.
         *         400:
         *           description: Bad request.
         * definitions:
         *   BasicProduct:
         *     type: "object"
         *     properties:
         *       name:
         *         type: "string"
         *         required: true
         *         example: "Celular"
         *       valueUnitary:
         *         type: "double"
         *         required: true
         *         example: 1500.99
         *       amount:
         *         type: "integer"
         *         required: true
         *         example: 10
         *   CompleteProduct:
         *     allOf:
         *       - $ref: '#/definitions/BasicProduct'
         *       - type: "object"
         *         properties:
         *           lastSell:
         *             type: "object"
         *             properties:
         *               data:
         *                 type: "date"
         *                 required: false
         *                 default: null
         *                 example: "2020-10-29T13:41:18.420Z"
         *               value: 
         *                 type: "double"
         *                 required: false
         *                 default: null
         *                 example: 1270.20
         *   Products:
         *       type: "object"
         *       properties:
         *         products:
         *           type: "array"
         *           items:
         *             $ref: '#/definitions/BasicProduct'
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
