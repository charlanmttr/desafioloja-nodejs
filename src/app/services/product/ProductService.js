module.exports = ({ productRepository }) => ({
    create: async (data) => {
        return await productRepository.create(data);
    },

    list: async () => {
        return await productRepository.findPaginated({});
    }
});