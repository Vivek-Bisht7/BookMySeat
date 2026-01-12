const mongoose = require('mongoose');

const dbConnection = async ()=>{
    try{
        if(!process.env.MONGODB_URI){
            console.error("MONGODB_URI not defined in environment variables");
            process.exit(1);
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected successfully");
    }
    catch(err){
        console.log("Error : " + err.message);
        process.exit(1);
    }
}

module.exports = {dbConnection};