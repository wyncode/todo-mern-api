const mongoose = require('mongoose');
const moment = require('moment');

const taskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    dueDate: {
      type: Date
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

// Format the date sent back by mongo
taskSchema.methods.toJSON = function () {
  const task = this;
  const taskObject = task.toObject();
  if (taskObject.dueDate) {
    taskObject.dueDate = moment(taskObject.dueDate).format('YYYY Mo Do');
  }
  return taskObject;
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
