module.exports = ({ productService }) => ({
    execute: async query => productService.search(query)
});