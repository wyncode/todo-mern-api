if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const User = mongoose.model('User', {
  name: {
    type: String
  },
  age: {
    type: Number
  }
});

const me = new User({
  name: 'Leo',
  age: 35
});

me.save()
  .then(() => {
    console.log(me);
  })
  .catch(error => {
    console.log('Error!', error);
  });

const Task = mongoose.model('Task', {
  description: {
    type: String
  },
  completed: {
    type: Boolean
  }
});

const task = new Task({
  description: 'Learn mongoose',
  completed: false
});

task
  .save()
  .then(() => {
    console.log(task);
  })
  .catch(error => {
    console.log(error);
  });
