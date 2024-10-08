const User = require('../models/user.model')
const catchAsync = require('../utils/catchAsync')
const authService = require('../services/auth.service');
const ApiError = require('../utils/apiError');
const httpStatus = require('http-status');
const Login = catchAsync(async(req,res,next)=>{
       try{
        const result = await authService.login(req.body);
       return  res.status(httpStatus.OK).json({message: result.msg});
       }
       catch(err){
        return res.status(httpStatus.BAD_REQUEST).json({errmessage: err.message});
       }
       
});
const varifyOtp = catchAsync(async(req,res,next)=>{
      
       try{
        const result = await authService.varifyOtp(req.body);
        res.status(httpStatus.OK).json({message: result.msg, token: result.token});
       }
       catch(err){
        return res.json({errmessage: err.message});
       }
});

module.exports = {Login,varifyOtp}