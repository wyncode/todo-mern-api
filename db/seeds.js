if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const Task = require('../models/task'),
  User = require('../models/user');

const mongoose = require('mongoose'),
  faker = require('faker');

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const dbReset = async () => {
  await User.deleteMany({}, function (err) {
    User.countDocuments({}, function (err, count) {
      console.log('Number of users:', count);
    });
  });
  await Task.deleteMany({}, function (err) {
    Task.countDocuments({}, function (err, count) {
      console.log('Number of tasks:', count);
    });
  });
  const userIdArray = [];

  for (let i = 0; i < 1000; i++) {
    const me = new User({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      age: Math.floor(Math.random() * 50) + 18,
      email: faker.internet.email(),
      password: faker.internet.password()
    });
    await me.generateAuthToken();
    userIdArray.push(me._id);
  }

  for (let i = 0; i < 1000; i++) {
    const task = new Task({
      description: faker.lorem.paragraph(),
      completed: Boolean(Math.round(Math.random())),
      dueDate: faker.date.future(),
      owner: userIdArray[Math.floor(Math.random() * userIdArray.length)]
    });
    await task.save();
  }
  await User.countDocuments({}, function (err, count) {
    console.log('Number of users:', count);
  });
  await Task.countDocuments({}, function (err, count) {
    console.log('Number of tasks:', count);
  });
};

dbReset();

// console.log(me);
