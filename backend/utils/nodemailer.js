const transport = require("../config/email.config")

class NodeMailer {
        static SendEmailForOtp = async(otp,userEmail)=>{
                    await transport.sendMail({
            from: "Q-account_varify", // sender address
            to: userEmail, // list of receivers
            subject: "OTP ✔", // Subject line
            // text: "Hello world?", // plain text body
            html: `
                        Hi, ${userEmail},

                        your otp is <b>${otp}</b>

            `, // 
                    })
        }
} 

module.exports =  NodeMailer