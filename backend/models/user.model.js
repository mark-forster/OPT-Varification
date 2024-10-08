const mongoose= require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, required: true,trim:true, unique: true},
    otp: {type: String,trim:true, required: true},
    date: {type: Date, default: Date.now},
    isVarified: {type: Boolean, default: false}
},{timestamps:true});


module.exports = mongoose.model('User', userSchema);