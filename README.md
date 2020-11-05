## Introduction
This API was developed as a conclusion to the performance as Shadow Developer.

The objective was to create an endpoint to register purchases to the database  adding an interest rate of 2.25%(based on SELIC rate) per month if the purchase had more than 6 (six) installments.

Developed endpoints:
- **POST /products:** add product (receives: name, value, amount).
- **GET /products:** returns a list of products.
- **GET /products/search:** returns a list of products using a filter of minimum and maximum prices received in the query.
- **GET /products/id:** returns a single product that matches the ObjectID.
- **POST /purchase:** add a purchase (receives: product, entry price and number of installments).

### Running on native machine
1. Install the dependencies with `npm install`
2. Run the docker-compose up debug option with `docker-compose -f "docker-compose.yml" up --build -d` to up mongodb database
3. Run the application in development mode with `npm run dev`

### Docs
Docs (Swagger/OAS 3.0) are at `http://localhost:4000/api/docs`

## Scripts
This boilerplate comes with a collection of npm scripts to make your life easier, you'll run them with `npm run <script name>`:
- `dev`: Run the application in development mode
- `start` Run the application in production mode (prefer not to do that in development)
- `test`: Run the test suite (not implemented yet).
- `test:unit`: Run only the unit tests (not implemented yet).
- `test:features`: Run only the features tests (not implemented yet).
- `test:integration`: Run only the integration tests (not implemented yet).
- `coverage`: Run only the unit tests and generate code coverage for them, the output will be on `coverage` folder
- `lint`: Lint the codebase

### Send requests
To test the API I used the Postman tool, with it is possible send requests and receive their returns. Inside the folder there is a file __**. postman_collection.json__ that can be imported to your [Postman](https://www.postman.com/).

## Tech
- [Node v10.13+](http://nodejs.org/)
- [Express](https://npmjs.com/package/express)
- [Helmet](https://www.npmjs.com/package/helmet)
- [Awilix](https://www.npmjs.com/package/awilix)
- [Joi](https://www.npmjs.com/package/joi)
- [Moment](https://www.npmjs.com/package/moment)
- [HTTP Status](https://www.npmjs.com/package/http-status)
- [Log4js](https://www.npmjs.com/package/log4js)
- [Log4js/GELF](https://github.com/log4js-node/gelf)
- [Morgan](https://www.npmjs.com/package/morgan)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [Mocha](https://www.npmjs.com/package/mocha)
- [Chai](https://www.npmjs.com/package/chai)
- [FactoryGirl](https://www.npmjs.com/package/factory-girl)
- [Istanbul](https://www.npmjs.com/package/istanbul) + [NYC](https://www.npmjs.com/package/nyc)
- [ESLint](https://www.npmjs.com/package/eslint)