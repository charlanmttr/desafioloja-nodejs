module.exports = ({ userRepository }) => ({
    createUser: async (data) => {
        return await userRepository.createUser(data);
    }
});