module.exports = ({ productService, logger}) => ({
    execute: async body => {
        try {
            return await productService.create(body);
        } catch (error) {
            logger.error(error);
            throw (error);
        }
    }
});