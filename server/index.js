const express = require('express');
const app = express();
const {dbConnection} = require('./config/connection');

require('dotenv').config();
dbConnection();

app.listen(process.env.PORT,()=>{
    console.log("Server has started running on port : " + process.env.PORT);
})