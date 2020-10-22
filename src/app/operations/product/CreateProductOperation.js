module.exports = ({ productService }) => ({
    execute: async body => await productService.createProduct(body)
});