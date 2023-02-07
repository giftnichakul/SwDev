const express = require('express');
const dotenv = require('dotenv');

//Route files
const hospitals = require('./routes/hospital');

dotenv.config({path: './config/config.env'});

const app = express();

// app.get('/', (req, res) =>{
//     res.send('<h1>Hello from express</h1>');
//     res.status(200).json({success: true, data:{id:1}});
// })

/*
app.get('/api/v1/hospitals', (req, res) =>{
    res.status(200).json({success: true, msg:"Show all hospitals"});
})

app.get('/api/v1/hospitals/:id', (req, res) =>{
    res.status(200).json({success: true, msg:`Show all hospital ${req.params.id}`});
})

app.post('/api/v1/hospitals', (req, res) =>{
    res.status(200).json({success: true, msg:`Create new hospitals`});
})

app.put('/api/v1/hospitals/:id', (req, res) =>{
    res.status(200).json({success: true, msg:`Update hospital ${req.params.id}`});
})

app.delete('/api/v1/hospitals/:id', (req, res) =>{
    res.status(200).json({success: true, msg:`Delete hospital ${req.params.id}`});
})
*/

app.use('/api/v1/hospitals', hospitals);
const PORT=process.env.PORT || 5000;
app.listen(PORT, console.log('Server running in ', process.env.NODE_ENV, ' mode on port ', PORT));