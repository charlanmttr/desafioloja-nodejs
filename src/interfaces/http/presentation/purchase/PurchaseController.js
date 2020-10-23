const AsyncMiddleware = require('src/interfaces/http/presentation/middlewares/AsyncMiddleware');

module.exports = opts => ({
    createPurchase: AsyncMiddleware(async ctx => {
        try {
            const response = await opts.createPurchaseOperation.execute(ctx.body);
            return ctx.res.status(opts.httpConstants.code.CREATED).json(response);
            
        } catch (error) {
            return ctx.res.status(opts.httpConstants.code.BAD_REQUEST).json({ 'msg': error });
        }         
    }),
});
