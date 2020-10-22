'use strict';
const { Schema } = require('mongoose');
const paginate = require('mongoose-paginate-v2');

module.exports = ({ providerConnection }) => {
    const connection = providerConnection.connection;

    const userSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        birth_date: {
            type: String,
            required: false
        }
    }, { versionKey: false });

    userSchema.plugin(paginate);

    userSchema.index(
        { id: false },
        { unique: true }
    );

    return connection.model('user', userSchema);
};
