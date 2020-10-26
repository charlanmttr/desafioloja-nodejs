const AsyncMiddleware = require('src/interfaces/http/middlewares/AsyncMiddleware');

module.exports = opts => ({
    createPurchase: AsyncMiddleware(async ctx => {
        try {
            const response = await opts.createPurchaseOperation.execute(ctx.body);
            
            const purchase = opts.purchaseSerializer.create(response);

            return ctx.res.status(opts.httpConstants.code.CREATED).json(purchase);
            
        } catch (error) {
            return ctx.res.status(opts.httpConstants.code.BAD_REQUEST).json({ 'msg': error });
        }         
    }),
});
