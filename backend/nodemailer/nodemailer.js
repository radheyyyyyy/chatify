const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require("../config");

const auth=nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 485,
    secure: true,
    service: 'gmail',
    auth:{
        /* add your auth here for sending mail
        user:"chatify4@gmail.com",
        pass:"fxqgsnxvs"
         */
    }
})


    async function sendMail(email){

        let token=jwt.sign({email}, SECRET_KEY, { expiresIn: "5m" });

    try {
        await auth.sendMail({
        from: "chatify4@gmail.com",
        to:email,
        subject:"Welcome to chatify-Email verification",
        html:`
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .logo {
            width: 100px;
            margin-bottom: 20px;
        }
        .btn {
            display: inline-block;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            font-weight: bold;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #888888;
        }
        </style>
        </head>
        <body>
        <div class="container">
        
        <h2>Email Verification</h2>
        <p>Thank you for signing up for Chatify! Please verify your email address by clicking the button below:</p>
        <a class="btn" href=http://localhost:3000/chatify/verify?token=${token} target="_blank">Verify Email</a>
         <p class="warning">⚠️ This link will expire in 5 minutes.</p>
        <p>If you did not create an account, please ignore this email.</p>
        <div class="footer">
            &copy; 2025 Chatify. All rights reserved.
        </div>
        </div>
        </body>
        </html>
        `
    })}
catch (e){
        console.error(e)
    }
}

module.exports={
    sendMail
}