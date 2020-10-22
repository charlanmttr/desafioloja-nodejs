const AsyncMiddleware = require('src/interfaces/http/presentation/middlewares/AsyncMiddleware');

module.exports = opts => ({
    createProduct: AsyncMiddleware(async ctx => {
        const response = await opts.createProductOperation.execute(ctx.body);
        return ctx.res.status(opts.httpConstants.code.CREATED).json(response);
    }),

    listProducts: AsyncMiddleware(async ctx => {
        const response = await opts.listProductsOperation.execute();
        return ctx.res.status(opts.httpConstants.code.CREATED).json(response);
    })
});
