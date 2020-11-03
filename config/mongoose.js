//require the library
const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://localhost/codeial_development');

//acquire the connection (to check if it is successful)
const db = mongoose.connection;

//print error if connection failure
db.on('error', console.error.bind(console, 'error connecting to db'));

//up and running then print the message
db.once('open', function() {
  // we're connected!
  console.log('Successfully connected to the database');
});

module.exports = db;
