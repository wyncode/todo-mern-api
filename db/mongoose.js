if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid.');
      }
    }
  },
  password: {
    type: String,
    required: true,
    trime: true,
    validate(value) {
      if (value.toLowerCase() === 'password') {
        throw new Error("Password can't be password.");
      }
      if (value.length < 6) {
        throw new Error('Password must be at least 6 characters long.');
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number.');
      }
    }
  }
});

const me = new User({
  name: 'Leo',
  email: 'LEO@GMAIL.COM     ',
  password: 'pass'
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
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const task = new Task({
  description: 'Learn mongoose    '
});

task
  .save()
  .then(() => {
    console.log(task);
  })
  .catch(error => {
    console.log(error);
  });
