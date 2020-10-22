const DUPLICATE_KEY_ERROR_CODE = 11000;
const clear = require('src/infra/support/ClearObject');

class Repository {
    constructor({ ResourceModel, ResourceMapper, exception }) {
        this.ResourceModel = ResourceModel;
        this.ResourceMapper = ResourceMapper;
        this.exception = exception;
    }

    async count(query = {}) {
        return await this.ResourceModel.countDocuments(query);
    }

    async get(query) {
        const databaseResource = await this.ResourceModel.findOne(query);
        return this.ResourceMapper.toEntity(databaseResource);
    }

    async create(domainEntity) {
        try {
            const resourceModel = this.ResourceModel(
                this.ResourceMapper.toDatabase(domainEntity)
            );
            const databaseCreatedResource = await resourceModel.save();

            return this.ResourceMapper.toEntity(databaseCreatedResource);
        } catch (error) {
            if (error.code === DUPLICATE_KEY_ERROR_CODE)
                throw this.exception.operation('Duplicate key error');
            throw this.exception.operation('Database error');
        }
    }

    async update(query, domainEntity, options) {
        try {
            if (!options) {
                options = {
                    new: true,
                    upsert: false,
                    runValidators: true
                };
            }

            const databaseUpdatedResource = await this.ResourceModel.findOneAndUpdate(
                query,
                this.ResourceMapper.toDatabase(domainEntity),
                options
            );

            return this.ResourceMapper.toEntity(databaseUpdatedResource);
        } catch (error) {
            if (error.code === DUPLICATE_KEY_ERROR_CODE)
                throw this.exception.operation('Duplicate key error');
            throw this.exception.operation('Database error');
        }
    }

    async replace(query, domainEntity) {
        try {
            const databaseReplacedResource = await this.ResourceModel.findOneAndReplace(
                query,
                this.ResourceMapper.toDatabase(domainEntity),
                {
                    new: true,
                    upsert: false,
                    overwrite: true,
                    runValidators: true
                }
            );
            return this.ResourceMapper.toEntity(databaseReplacedResource);

        } catch (error) {
            if (error.code === DUPLICATE_KEY_ERROR_CODE)
                throw this.exception.operation('Duplicate key error');
            throw this.exception.operation('Database error');
        }
    }

    async upsert(query, entity) {
        try {
            const databaseUpdatedResource = await this.ResourceModel.findOneAndUpdate(
                query,
                this.ResourceMapper.toDatabase(entity),
                {
                    new: true,
                    upsert: true,
                    runValidators: true
                }
            );
            return this.ResourceMapper.toEntity(databaseUpdatedResource);

        } catch (error) {
            if (error.code === DUPLICATE_KEY_ERROR_CODE)
                throw this.exception.operation('Duplicate key error');
            throw this.exception.operation(error);
        }
    }

    async remove(query) {
        const databaseDeletedResource = await this.ResourceModel.findOneAndRemove(
            query
        );

        return this.ResourceMapper.toEntity(databaseDeletedResource);
    }

    async findPaginated({
        page = 1,
        limit = 100,
        query = {},
        clearQuery = true
        }
    ) {
        if (clearQuery) clear(query);

        const option = { page: Number(page), limit: Number(limit) };
        const result = await this.ResourceModel.paginate(query, option);
        result.docs = result.docs.map(this.ResourceMapper.toEntity);

        return result;
    }
}
module.exports = Repository;
