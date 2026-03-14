require('dotenv').config();
const express = require('express');
const app = express();
const {dbConnection} = require('./config/connection');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const theatreRoutes = require('./routes/theatreRoutes');
const screenRoutes = require('./routes/screenRoutes');
const showRoutes = require('./routes/showRoutes');
const bannerRoutes = require('./routes/bannerRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

dbConnection();

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
}))

app.use(express.json());

app.use('/api/user',userRoutes);
app.use('/api/movie',movieRoutes);
app.use('/api/theatre',theatreRoutes);
app.use('/api/screen',screenRoutes);
app.use('/api/show',showRoutes);
app.use('/api/banner',bannerRoutes);
app.use('/api/booking',bookingRoutes);

app.get("/health",(req,res)=>{
  res.status(200).json({status:"ok"});
})

app.listen(process.env.PORT,()=>{
    console.log("Server has started running on port : " + process.env.PORT);
})