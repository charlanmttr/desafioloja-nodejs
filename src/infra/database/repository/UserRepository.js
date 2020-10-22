class UserRepository {
    constructor({ userModel }) {
        this.userModel = userModel;
    }

    async createUser(data) {
        return await this.userModel.create(data);
    }
}

module.exports = UserRepository;
