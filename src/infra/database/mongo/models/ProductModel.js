'use strict';
const { Schema } = require('mongoose');
const paginate = require('mongoose-paginate-v2');

module.exports = ({ providerConnection }) => {
    const connection = providerConnection.connection;

    const productSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        valueUnitary: {
            type: Number,
            required: true
        },
        amount: {
            type: Number,
            required: true
        }

    }, { versionKey: false });

    productSchema.plugin(paginate);

    productSchema.index(
        { id: false },
        { unique: true }
    );

    return connection.model('product', productSchema);
};
