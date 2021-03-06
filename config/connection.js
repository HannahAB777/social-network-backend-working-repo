require('dotenv').config();
const { connect, connection, mongoose } = require('mongoose');

// After you create your Heroku application, visit https://dashboard.heroku.com/apps/ select the application name and add your Atlas connection string as a Config Var
// Node will look for this environment variable and if it exists, it will use it. Otherwise, it will assume that you are running this application locally, create an account with mongoatlas and create a new env key in heroku called mongodb URI and paste
const connectionString =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/SocialMediaDB';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, () => console.log('connected to DB'));

module.exports = connection;