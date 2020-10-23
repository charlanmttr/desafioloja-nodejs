module.exports = ({ purchaseRepository }) => ({
    create: async (data) => {
        return await purchaseRepository.create(data);
    }
});