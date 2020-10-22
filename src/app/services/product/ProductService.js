module.exports = ({ productRepository }) => ({
    create: async (data) => {
        return await productRepository.create(data);
    },

    list: async () => {
        return await productRepository.findPaginated({});
    },

    search: async (finalQuery) => {
        console.log(finalQuery);

        return await productRepository.findPaginated({query: finalQuery});
    }
});