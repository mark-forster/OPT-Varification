const mongoose = require('mongoose');

const connectDbB= async()=>{
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log(`Database connect with ${mongoose.connection.host}`);
    }
    catch(error){
        mongoose.disconnect();
        process.exit(1);
    }
}

module.exports = connectDbB;