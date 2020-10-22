const AsyncMiddleware = require('src/interfaces/http/presentation/middlewares/AsyncMiddleware');

module.exports = opts => ({
    createUser: AsyncMiddleware(async ctx => {
        const response = await opts.createUserOperation.execute(ctx.body);
        return ctx.res.status(opts.httpConstants.code.CREATED).json(response);
    })
});
