module.exports = ({ purchaseRepository, logger }) => ({
    create: async (data) => {
        try {
            return await purchaseRepository.create(data);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
});