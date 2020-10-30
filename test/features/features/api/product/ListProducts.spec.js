const request = require('test/support/request');
const { expect } = require('chai');

describe('API :: GET /api/users', () => {
    context('list users', () => {

        it('returns all products and status 200', async () => {
            const { body } = await request()
                .get('/api/products')
                .expect(200);

            expect(body).to.have.keys(['products', 'totalProducts', 'page', 'totalPages']);

            body.products.map(user => {
                expect(user).to.have.keys(['name', 'amount', 'valueUnitary']);
                expect(user.name).to.be.a('string');
                expect(user.amount).to.be.a('number');
                expect(user.valueUnitary).to.be.a('number');
            });
        });
    });
});
