## Introduction
Tokenization service.
### Running on native machine
1. Install the dependencies with `npm install`
2. Run the docker-compose up debug option with `docker-compose -f "docker-compose.mongodb-test.yml" up -d --build` to up mongodb database
3. Run the application in development mode with `npm run dev`
4. Access `https://localhost:3000` and you're ready to go!
### Running on docker engine
1. Make sure your have the docker engine installed with `docker info`
2. Run the docker-compose up debug option with `docker-compose -f "docker-compose.debug.yml" up -d --build`
3. Access `https://localhost:3000` and you're ready to go!
### Running vault
1. Uncomment vault-ms service in `docker-compose.debug.yml` and comment json-server-mock in same file.
2. Run `docker-compose -f "docker-compose.debug.yml" up -d --build`
3. Run `docker ps -a` and clip containerId from vault service
4. Run `docker exec -it <containerId> /bin/sh` (if using windows, exec: `docker exec -it <container-id-vault> sh` into "C:/Program Files/Git/usr/bin/" folder)
5. Run `/vault/config/setup.sh`

### Docs
Docs (Swagger/OAS 3.0) are at `http://localhost:[PORT]/api/docs`
## Scripts
This boilerplate comes with a collection of npm scripts to make your life easier, you'll run them with `npm run <script name>`:
- `dev`: Run the application in development mode
- `start` Run the application in production mode (prefer not to do that in development)
- `test`: Run the test suite
- `test:unit`: Run only the unit tests
- `test:features`: Run only the features tests
- `test:integration`: Run only the integration tests (before run npm i -g newman to install newman)
- `coverage`: Run only the unit tests and generate code coverage for them, the output will be on `coverage` folder
- `lint`: Lint the codebase
## Tech
- [Node v10.13+](http://nodejs.org/)
- [Express](https://npmjs.com/package/express)
- [Helmet](https://www.npmjs.com/package/helmet)
- [Awilix](https://www.npmjs.com/package/awilix)
- [Joi](https://www.npmjs.com/package/joi)
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