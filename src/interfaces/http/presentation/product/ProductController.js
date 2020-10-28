const AsyncMiddleware = require('src/interfaces/http/middlewares/AsyncMiddleware');

module.exports = opts => ({
    createProduct: AsyncMiddleware(async ctx => {
        const response = await opts.createProductOperation.execute(ctx.body);

        if (!response)
            return ctx.res.status(opts.httpConstants.code.BAD_REQUEST).json(response);

        const product = opts.productSerializer.create(response);

        return ctx.res.status(opts.httpConstants.code.CREATED).json(product);
    }),

    listProducts: AsyncMiddleware(async ctx => {
        const response = await opts.listProductsOperation.execute();

        const product = opts.productSerializer.list(response);

        return ctx.res.status(opts.httpConstants.code.OK).json(product);
    }),

    searchProduct: AsyncMiddleware(async ctx => {
        const response = await opts.searchProductsOperation.execute(ctx.query);

        const product = opts.productSerializer.list(response);

        return ctx.res.status(opts.httpConstants.code.OK).json(product);
    }),

    findProduct: AsyncMiddleware(async ctx => {
        const response = await opts.findProductOperation.execute(ctx.params);

        const product = opts.productSerializer.findById(response);

        return ctx.res.status(opts.httpConstants.code.OK).json(product);
    })
});
