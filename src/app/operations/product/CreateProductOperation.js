module.exports = ({ productService }) => ({
    execute: async body => await productService.create(body)
});