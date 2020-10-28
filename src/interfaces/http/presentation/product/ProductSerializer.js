module.exports = () => ({

    findById({
        name,
        amount,
        valueUnitary,
        lastSell
    }) {
        return {
            product: {
                name,
                amount,
                valueUnitary,
                lastSell
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
                valueUnitary:product.valueUnitary,
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
    }){
        return {
            name,
            valueUnitary,
            amount
        };
    }
});