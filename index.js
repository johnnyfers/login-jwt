const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const userRouter = require('./routes/userRouter');
const mongoose = require('mongoose');
const adminRouter = require('./routes/adminRouter')

mongoose.connect(process.env.MONGODB_CONNECTION_URL, 
    {
        useNewUrlParser: true, useUnifiedTopology: true
    },
    (error)=>{
        error ? console.log(error) : console.log('mongodb is working')
    }
    )

app.use('/user', express.json(), userRouter);

app.get('/', (req,res)=>{
    res.send('Hello');
})

app.use('/admin', express.json(), adminRouter);



app.listen(process.env.PORT, ()=>{
    console.log('running on port ' + process.env.PORT);
})