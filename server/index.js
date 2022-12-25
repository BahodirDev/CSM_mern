const express = require('express');
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const server = require('./routes/server');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path')



const app = express();
dotenv.config();

// app
app.use(morgan('dev'))
app.use(express.json());
app.use(cors())

// db
// process.env.MONGO_URI ||
mongoose.connect(process.env.MONGO_URI,(err,done)=>{
    if(err){
        console.log(err);
    }
    console.log('DB connected');
})

// middleware routes
app.use('/',server)





if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*",(req,res)=>res.sendFile(path.resolve(__dirname, "../client","build","index.html")))
}else{
  app.get('/',(req,res)=>{
    res.json({message:"API running..."})
  })
}

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log("Server has been started on port ",PORT);
})