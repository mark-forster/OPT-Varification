const httpStatus = require('http-status');
const User = require('../models/user.model');
const ApiError = require('../utils/apiError');
const crypto = require('crypto');
const NodeMailer = require('../utils/nodemailer');
const JWTService = require('../utils/jwt');

const login= async (body) => {
    if(!body.email){
        throw new ApiError(httpStatus.BAD_REQUEST,"Please enter a valid email")
    }
    const otp = crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP

    await NodeMailer.SendEmailForOtp(otp,body.email);
    const user= await User.findOne({ email: body.email.toLowerCase() })
    if(user){
        await User.findOneAndUpdate({email: body.email.toLowerCase()},
        {
            otp:otp,
            isVarified:false,
        })
       return {
        msg:"Code send to your email address"
       }
    }
    //    Not Varified
    await NodeMailer.SendEmailForOtp(otp,body.email);

       await User.create({
            otp,
            email:body.email.toLowerCase()
       })
       return {
        msg:"Code send to your email address"
       } 


    
}

    //    varifying OPt
    const varifyOtp= async (body)=>{
        const {email,otp} = body;
        if(!email || !otp){
            throw new ApiError(httpStatus.BAD_REQUEST,"Email and OTP are required");
        }
        if(isNaN(otp)){
            throw new ApiError(httpStatus.BAD_REQUEST,"Invalid OTP");
        }
        // check otp is correct
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            throw new ApiError(httpStatus.FORBIDDEN, "Invalid username or password");
        }
        if(user.otp !== otp){
            throw new ApiError(httpStatus.FORBIDDEN, "Invalid OTP");
        }
        const token = await JWTService.generateToken({userId: user._id})
        return {
            msg:"Login success",
            token: token
        }
}

module.exports = {login, varifyOtp};

