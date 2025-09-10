require('dotenv').config();
const connectDB = require('./db/index.js');
const app = require('./app.js');
const { PORT } = require('./constants.js');



connectDB()
.then(app.listen(process.env.PORT||3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
}))
.catch((err) => {
    console.error('Error connecting to the database:', err);
});





// (async ()=> {
//     try{
//         await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
//     }catch(error) {
//         console.error('Error starting the server:', error);
//     }
// })()