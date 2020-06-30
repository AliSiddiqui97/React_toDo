const express = require("express");
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const PORT =  5000
const {MONGOURI}  = require('./keys')
var cors = require('cors')


//Conencting to mongo
mongoose.connect(MONGOURI,{ useUnifiedTopology: true,useNewUrlParser: true } );

mongoose.connection.on('connected',()=>{
    console.log('connected')
})
mongoose.connection.on('error',(err)=>{
    console.log('error', err )
})

//Call Schema
require('./models/user') //User here is the file name
require('./models/post')
//Middlewares

// parse  as JSON
app.use(cors())
// app.use(bodyParser.json())
app.use(express.json());
app.use(require('./routes/auth'))
app.use(require('./routes/post'))



app.listen(PORT,()=>{
    console.log('Server running on port 5000')
})