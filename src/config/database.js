const mongoose = require("mongoose");

const connectDB = async()=> {
  // pass the database connection url
  await mongoose.connect(process.env.DB_CONNECTION_SECRET);   
} 

module.exports = connectDB;
 