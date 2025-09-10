const express = require('express');
const appRouter = require('./routes/routes.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cookieParser());

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}
));
app.use('/api', appRouter);



module.exports = app;