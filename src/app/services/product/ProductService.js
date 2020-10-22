module.exports = ({ productRepository }) => ({
    createProduct: async (data) => {
        return await productRepository.createProduct(data);
    },

    listProducts: async () => {
        return await productRepository.listProducts();
    }
});