const request = require('supertest');
const app = require('../app');
const User = require('../models/user');

const userOne = {
  name: 'Leo Test',
  email: 'test@test.com',
  password: 'testpass'
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test('Should signup a new user', async () => {
  await request(app)
    .post('/users')
    .send({
      name: 'Leo',
      email: 'leo@leo.com',
      password: 'remember'
    })
    .expect(201);
});

test('Should login a user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: userOne.password
    })
    .expect(200);
});

test('Should not login a nonexistent user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: 'wrongpassword'
    })
    .expect(400);
});
