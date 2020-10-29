module.exports = ({ productRepository, logger }) => ({
    create: async (data) => {
        try {
            return await productRepository.create(data);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    list: async () => {
        try {
            return await productRepository.findPaginated({});
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    search: async (finalQuery) => {
        try {
            return await productRepository.findPaginated({ query: finalQuery });
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    find: async (_id) => {
        try {
            return await productRepository.get({ _id }, true); 
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    purchaseUpdate: async (_id, update) => {
        try {
            return await productRepository.update({ _id }, update);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
});