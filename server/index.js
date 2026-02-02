const express = require('express');
const app = express();
const {dbConnection} = require('./config/connection');
const cors = require('cors');
const authMiddleware = require('./middleware/authMiddleware');

require('dotenv').config();
dbConnection();

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
}))

app.listen(process.env.PORT,()=>{
    console.log("Server has started running on port : " + process.env.PORT);
})