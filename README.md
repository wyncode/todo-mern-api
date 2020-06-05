# Mern Todo API


## Requirements
 - [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/) (quick install: install Homebrew and `run brew update && brew tap mongodb/brew && brew install mongodb-community@4.2`)
   - `brew update`
   - `brew tap mongodb/brew`
   - `brew install mongodb-community@4.2`
## Setup

- `git clone git@github.com:wyncode/todo-mern-api.git`
- `cd todo-mern-api`
- `yarn`
- `cp sample.env .env`
- Fill in the environment variables.
- Reset and seed the database with `yarn db:reset`
- `yarn dev`

## NPM Packages Used

### Dependencies

- [@sendgrid/mail](https://sendgrid.com/docs/API_Reference/api_getting_started.html)(API Key Required)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js/)
- [cors](https://github.com/expressjs/cors#readme)
- [express](https://expressjs.com/)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme)
- [mongodb](http://mongodb.github.io/node-mongodb-native/)
- [mongoose](https://mongoosejs.com/)
- [multer](https://github.com/expressjs/multer#readme)
- [sharp](https://github.com/lovell/sharp)
- [validator](https://github.com/validatorjs/validator.js)

### DevDependencies

- [dotenv](https://github.com/motdotla/dotenv#readme)
- [jest](https://jestjs.io/)
- [nodemon](https://github.com/remy/nodemon)
- [prettier](https://prettier.io/)
- [supertest](https://github.com/visionmedia/supertest#readme)

## Run Test Suite

- `yarn test`

### Format Code

- `yarn prettier`

---

Add collection to your Postman account.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/9736846b31eae2710b6c)

---

## Deployment

```
heroku create
heroku config:set JWT_SECRET=neverstoplearning
heroku config:set MONGODB_URL=yourconnectionstring
heroku config:set SENDGRID_API_KEY=yourapikey
git push heroku master
```
