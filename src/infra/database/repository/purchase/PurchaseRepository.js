const PurchaseMapper = require('src/infra/database/repository/purchase/PurchaseMapper');
const Repository = require('src/infra/database/repository/Repository');

module.exports = class PurchaseRepository extends Repository {
    constructor({ purchaseModel, exception }) {
        super({
            ResourceModel: purchaseModel,
            ResourceMapper: PurchaseMapper
        });
        this.exception = exception;
    }
};
