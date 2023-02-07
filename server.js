const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//Load env vars
dotenv.config({path: './config/config.env'});

//Connect to database
connectDB();

//Route files
const hospitals = require('./routes/hospital');

const app = express();
//Body parser
app.use(express.json());

app.use('/api/v1/hospitals', hospitals);
const PORT=process.env.PORT || 5000;
const server = app.listen(PORT, console.log('Server running in ', process.env.NODE_ENV, ' mode on port ', PORT));

process.on('unhandledRejection', (err, promise) =>{
    console.log(`Error: ${err.message}`);
    server.close(() =>process.exit(1));
})