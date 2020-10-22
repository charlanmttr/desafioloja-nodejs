module.exports = ({ userService }) => ({
    execute: async body => {
        
        return await userService.createUser(body);
    }
});