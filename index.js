require('dotenv').config();
const express = require('express');
const app = express();
const userRouter = require('./routes/userRouter');
const mongoose = require('mongoose');
const adminRouter = require('./routes/adminRouter')
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

mongoose.connect(process.env.MONGODB_CONNECTION_URL, 
    {
        useNewUrlParser: true, useUnifiedTopology: true
    },
    (error)=>{
        error ? console.log(error) : console.log('mongodb is working')
    }
    )

app.use('/user', express.json(), userRouter);

app.get('/', (req,res)=>{ res.render('index', {error: false, body:{}})})
app.get('/createAccount', (req,res)=>{ res.render('registerScreen', {error: false, body:{}})})

app.use('/admin', express.json(), adminRouter);

app.listen(process.env.PORT, ()=>{
    console.log('running on port ' + process.env.PORT);
})





