class ProductRepository {
    constructor({ productModel }) {
        this.productModel = productModel;
    }

    async createProduct(data) {
        return await this.productModel.create(data);
    }

    async listProducts() {
        return await this.productModel.find();
    }
}

module.exports = ProductRepository;
