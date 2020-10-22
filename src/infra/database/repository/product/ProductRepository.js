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
};
