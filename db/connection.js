const mongoose = require('mongoose');

const connection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log('database connected');
  } catch (error) {
    console.log('something went wrong while connecting database');
  }
}

module.exports = connection;