const ProductMapper = require('src/infra/database/repository/product/ProductMapper');
const Repository = require('src/infra/database/repository/Repository');

module.exports = class ProductRepository extends Repository {
    constructor({ productModel, exception }) {
        super({
            ResourceModel: productModel,
            ResourceMapper: ProductMapper
        });
        this.exception = exception;
    }

    mountUpdateQuery(value) {
        return {
            $inc: { amount: -1 },
            $set: {
                'lastSell.date': new Date(),
                'lastSell.value': value
            }
        };
    }

    mountSearchQuery(query) {
        const { min_price = 0.01, max_price = 1000000 } = query;

        return {
            valueUnitary: {
                $gte: min_price,
                $lte: max_price,
            },
        };
    }
};
