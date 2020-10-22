module.exports = ({ productService }) => ({
    execute: async () => await productService.list()
});