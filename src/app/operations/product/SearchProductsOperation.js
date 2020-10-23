module.exports = ({ productService }) => ({
    execute: async query => {
        const { min_price: min_price } = query;
        const { max_price: max_price } = query;

        const finalQuery = {};

        if (min_price && max_price) {
            const queryElem = [];
            
            queryElem.push({ valueUnitary: { $gte: min_price } });  /* (greater than or equal) -> maior ou igual a min_price */
            queryElem.push({ valueUnitary: { $lte: max_price } });  /* (less than or equal) -> menor ou igual a max_price */

            finalQuery['$and'] = queryElem;
            /* finalQuery:
                    .find({ $and: [ { valueUnitary: {$lte : max_price} }, { valueUnitary: {$gte : min_price } } ]}) 
            */
        } else if (min_price) {
            finalQuery['valueUnitary'] = { $gte: min_price };

        } else if (max_price) {
            finalQuery['valueUnitary'] = { $lte: max_price };

        }

        return productService.search(finalQuery);
    }
});