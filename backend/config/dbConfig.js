const mongoose = require('mongoose');

function connectDB(uri = 'mongodb://127.0.0.1:27017/smsDB') {
  return new Promise((resolve, reject) => {
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to MongoDB');
      resolve();
    })
    .catch(error => {
      console.error('Could not connect to MongoDB', error);
      reject(error);
    });
  });
}

module.exports = { connectDB, mongoose };