module.exports = ({ productService }) => ({
    execute: async (param) => {
        const { id: _id } = param;
        
        return await productService.find(_id);
    }
});