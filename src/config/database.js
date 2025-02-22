const mongoose = require('mongoose');

const connectDB = async()=> {
  // pass the database connection url
  await mongoose.connect('mongodb://localhost:27017/devTinder')   
} 

module.exports = connectDB;
