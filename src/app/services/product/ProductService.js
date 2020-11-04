module.exports = ({ productRepository, logger }) => ({
    create: async (data) => {
        try {
            return await productRepository.create(data);
        } catch (error) {
            logger.error(error.message);
            throw error.message;
        }
    },

    list: async () => {
        try {
            return await productRepository.findPaginated({});
        } catch (error) {
            logger.error(error.message);
            throw error.message;
        }
    },

    search: async (finalQuery) => {
        try {
            return await productRepository.findPaginated({ query: finalQuery });
        } catch (error) {
            logger.error(error.message);
            throw error.message;
        }
    },

    find: async (_id) => {
        try {
            return await productRepository.get({ _id }, true); 
        } catch (error) {
            logger.error(error.message);
            throw error.message;
        }
    },

    purchaseUpdate: async (_id, value) => {
        try {
            let query = productRepository.mountUpdateQuery(value);

            return await productRepository.update({ _id }, query);
        } catch (error) {
            logger.error(error.message);
            throw error.message;
        }
    }
});