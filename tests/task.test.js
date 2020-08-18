const request = require('supertest');
const app = require('../server/app');
const { userOne, userTwo, taskOne, setUpDatabase } = require('./fixtures/db');
const Task = require('../server/db/models/task');

beforeEach(setUpDatabase);

test('Should create task for user', async () => {
  const response = await request(app)
    .post('/api/tasks')
    .set('Authorization', `jwt ${userOne.tokens[0].token}`)
    .send({
      description: 'From my test'
    })
    .expect(201);
  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
});

test('Should fetch user tasks', async () => {
  const response = await request(app)
    .get('/api/tasks')
    .set('Authorization', `jwt ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  expect(response.body.length).toEqual(2);
});

test('Should not delete other users tasks', async () => {
  const response = await request(app)
    .delete(`/api/tasks/${taskOne._id}`)
    .set('Authorization', `jwt ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);
  const task = await Task.findById(taskOne._id);
  expect(task).not.toBeNull();
});
