module.exports = ({ productService }) => ({
    execute: async query => {
        const { min_price: min_price } = query;
        const { max_price: max_price } = query;

        const finalQuery = {};

        if (min_price && max_price) {
            const queryElem = [];
            
            /* .find({ $and: [ { valueUnitary: {$lte : max_price} }, { valueUnitary: {$gte : min_price } } ]}) */
            queryElem.push({ valueUnitary: { $gte: min_price } });
            queryElem.push({ valueUnitary: { $lte: max_price } });

            finalQuery['$and'] = queryElem;

        } else if (min_price) {
            finalQuery['valueUnitary'] = { $gte: min_price };

        } else if (max_price) {
            finalQuery['valueUnitary'] = { $lte: max_price };

        }

        /* .find({ $and: [ { valueUnitary: {$lte : 10} }, { valueUnitary: {$gte : 5 } } ]}) */
        /* {"valueUnitary" : {$gt : 0.05}} -> (greater than) -> maior que 0.05 */
        /* {"valueUnitary" : {$gte : 0.05}} -> (greater than or equal) -> maior ou igual a 0.05 */
        /* {"valueUnitary" : {$lte : 0.05}} -> (less than or equal) -> menor ou igual a 0.05 */

        return productService.search(finalQuery);
    }
});