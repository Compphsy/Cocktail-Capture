const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const dotenv = require('dotenv');
dotenv.config();
const connectDB = async () => {
    try{

       const conn = await mongoose.connect(process.env.MONGODB_URI, {
           useNewUrlParser: true,
           useUnifiedTopology: true
       });
       console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
