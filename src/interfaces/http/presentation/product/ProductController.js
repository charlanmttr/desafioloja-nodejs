const AsyncMiddleware = require('src/interfaces/http/middlewares/AsyncMiddleware');

module.exports = opts => ({
    createProduct: AsyncMiddleware(async ctx => {
        try {
            const response = await opts.createProductOperation.execute(ctx.body);
    
            const product = opts.productSerializer.create(response);
    
            return ctx.res.status(opts.httpConstants.code.CREATED).json(product);
        } catch (error) {
            opts.logger.error(error);
            return ctx.res.status(opts.httpConstants.code.BAD_REQUEST).json({ msg: error });
        }

    }),

    listProducts: AsyncMiddleware(async ctx => {
        try {
            const response = await opts.listProductsOperation.execute();

            if (response.docs.lenght === 0)
                return ctx.res.status(opts.httpConstants.code.NO_CONTENT).json();

            const product = opts.productSerializer.list(response);

            return ctx.res.status(opts.httpConstants.code.OK).json(product);
        } catch (error) {
            opts.logger.error(error);
            return ctx.res.status(opts.httpConstants.code.BAD_REQUEST).json({ msg: error });
        }

    }),

    searchProduct: AsyncMiddleware(async ctx => {
        try {
            const response = await opts.searchProductsOperation.execute(ctx.query);

            if (response.docs.lenght === 0)
                return ctx.res.status(opts.httpConstants.code.NO_CONTENT).json();

            const product = opts.productSerializer.list(response);

            return ctx.res.status(opts.httpConstants.code.OK).json(product);
        } catch (error) {
            opts.logger.error(error);
            return ctx.res.status(opts.httpConstants.code.BAD_REQUEST).json({ msg: error });
        }

    }),

    findProduct: AsyncMiddleware(async ctx => {
        try {
            const response = await opts.findProductOperation.execute(ctx.params);

            if (!response)
                return ctx.res.status(opts.httpConstants.code.NO_CONTENT).json();

            const product = opts.productSerializer.findById(response);

            return ctx.res.status(opts.httpConstants.code.OK).json(product);
        } catch (error) {
            opts.logger.error(error);
            return ctx.res.status(opts.httpConstants.code.BAD_REQUEST).json({ msg: error });
        }
    })
});
