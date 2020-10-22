module.exports = ({ productService }) => ({
    execute: async () => await productService.listProducts()
});