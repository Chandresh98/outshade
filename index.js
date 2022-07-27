const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const mongoose = require('mongoose')
const router = require('./route')
const cookieParser  = require('cookie-parser')




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cookieParser())


mongoose.connect('mongodb+srv://pankaj:XHR0F0IrqL14JxKZ@cluster0.ajtoy.mongodb.net/outshade-Database-DB',{useNewUrlParser:true})
.then( () =>console.log("Mongoose is contected..."))
.catch( err => console.log(err))

app.use('/', router)


app.listen(process.env.PORT || 5000, function() {
    console.log("Express App Running on port " +  (process.env.PORT || 5000));
});