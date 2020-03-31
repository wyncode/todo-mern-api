const mongoose = require("mongoose");
// Connect to the database and choose database name
// in this example task-manager-api is the database name
// databases can be created on the spot

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
