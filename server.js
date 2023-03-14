const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

//Load env vars
dotenv.config({path: './config/config.env'});

//Connect to database
connectDB();

//Route files
const hospitals = require('./routes/hospital');
const auth = require('./routes/auth');
const appointment = require('./routes/appointment');

const app = express();
//Body parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

//Mount routers
app.use('/api/v1/hospitals', hospitals);
app.use('/api/v1/auth', auth);
app.use('/api/v1/appointments', appointment);
const PORT=process.env.PORT || 5000;
const server = app.listen(PORT, console.log('Server running in ', process.env.NODE_ENV, ' mode on port ', PORT));

process.on('unhandledRejection', (err, promise) =>{
    console.log(`Error: ${err.message}`);
    server.close(() =>process.exit(1));
})