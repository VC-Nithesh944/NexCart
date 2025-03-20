const mongoose = require('mongoose');
require('dotenv').config;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI );      //alert: ,{useNewUrlParser : true,useUnifiedTopology : true} these were no longer needed in nodejs 4.0.0v
        console.log('✅ MongoDB Connected Successfully');
    }catch (error){
        console.log('❌ MongoDB Connection Failed:', error);
        process.exit(1);
    };
}


module.exports = connectDB ;