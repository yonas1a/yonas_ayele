const mongoose = require('mongoose'); 
const connectDB = async() => { 
    try { 
        const conn = await mongoose.connect('mongodb+srv://yonas:yonasJo.@cluster0.osmn4.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0'); 
        console.log(`MongoDB Connected`); 
    } catch (error) { 
        console.error(error); 
        process.exit(1); 
    } 
}; 
module.exports = connectDB;