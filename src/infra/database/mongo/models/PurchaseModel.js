'use strict';
const { Schema } = require('mongoose');
const paginate = require('mongoose-paginate-v2');

module.exports = ({ providerConnection }) => {
    const connection = providerConnection.connection;

    const purchaseSchema = new Schema({
        product: {
            type: Schema.Types.ObjectId,
            ref: 'product',
            required: true
        },
        paymentCondition: {
            inputValue: {
                type: Number,
                required: true
            },
            numberOfInstallments: {
                type: Number,
                required: true
            }
        },
        value: {
            type: Number,
            required: true
        },
        monthlyInterestRate: {
            type: Number,
            required: true
        }
    }, { versionKey: false });

    purchaseSchema.plugin(paginate);

    purchaseSchema.index(
        { id: false },
        { unique: true }
    );

    return connection.model('purchase', purchaseSchema);
};
