require('dotenv').config();
const express = require('express');
const connectDB = require('./db/index.js');



connectDB();





// (async ()=> {
//     try{
//         await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
//     }catch(error) {
//         console.error('Error starting the server:', error);
//     }
// })()