if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = require('./server');
const port = process.env.PORT || 8080;

// Uncomment below to put server down for maintenance
// app.use((req, res, next) => {
// 	res.status(503).send('Site is currently down. Check back soon!');
// });

//  Listen on port production or dev port
app.listen(port, () => {
  console.log('Express server is running on port ' + port);
});
