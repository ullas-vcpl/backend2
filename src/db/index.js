const mongoose = require('mongoose');
const { DB_NAME } = require('../constants.js');

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DBURL}/${DB_NAME}`);
        console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
    }catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;