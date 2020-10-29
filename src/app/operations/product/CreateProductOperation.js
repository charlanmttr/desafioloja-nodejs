module.exports = ({ productService, logger}) => ({
    execute: async body => {
        try {
            const { product: query } = body;
            
            return await productService.create(query);
        } catch (error) {
            logger.error(error);
            throw (error);
        }
    }
});