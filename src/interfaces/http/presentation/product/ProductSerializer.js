const moment = require('moment');

module.exports = () => ({

    findById({
        name,
        amount,
        valueUnitary,
        lastSell
    }) {

        var date = lastSell.date ;
        var convertedDate = moment(date).format('DD MMM yyyy HH:mm:ss');

        return {
            product: {
                name,
                amount,
                valueUnitary,
                lastSell:{
                    date: convertedDate,
                    value: lastSell.value
                }
            }
        };
    },

    list({
        docs,
        totalDocs,
        page,
        totalPages
    }) {
        const products = docs.map(product => {
            return {
                name: product.name,
                amount: product.amount,
                valueUnitary: product.valueUnitary,
            };
        });

        return {
            products,
            totalProducts: totalDocs,
            page: page,
            totalPages: totalPages
        };
    },

    create({
        name,
        valueUnitary,
        amount,
    }) {
        return {
            product: {
                name,
                valueUnitary,
                amount
            }
        };
    }
});