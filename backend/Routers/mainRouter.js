const {Router} = require("express");
const {PrismaClient} = require("@prisma/client");
const jwt = require("jsonwebtoken");
const {SECRET_KEY} = require("../config");
const {sendMail} = require("../nodemailer/nodemailer");
const router = new Router();
const prisma=new PrismaClient();
router.post("/signup",async (req, res) => {
        const {firstName, lastName, email, password} = req.body;
        try {
                await prisma.users.create({
                data:{
                        firstName,
                        lastName,
                        email,
                        password
                }
                                        })
                await sendMail(email)
                res.status(201).json({
                msg:"verify_first"
                })
        }
        catch(err){
                res.status(500).json({
                        msg:"database is not online right now"
                })
        }
        })

router.post("/login",async (req, res) => {
        const {email, password} = req.body;
        let resp=await prisma.users.findUnique({
                where:{email}
        })
        if(resp.email===email){
                if(resp.isVerified){
                if(resp.password===password){
                res.status(200).json({
                        msg:"success_login"
                })}
                else {
                        res.status(200).json({
                                msg:"incorrect_password"
                        })
                }
                }
                else {
                        await sendMail(resp.email)
                        res.status(200).json({
                                msg:"verify_first"
                        })

                }
        }
        else {
                res.json({
                        msg:"signup_first"
                })
        }
})
router.get("/verify",async (req,res)=>{
        const token=req.query.token;
        let decodedToken=jwt.decode(token);
        try {
                await jwt.verify(token,SECRET_KEY);
                await prisma.users.update({
                        where: {
                                email: decodedToken.email
                        },
                        data: {
                                isVerified: true
                        }
                })
                res.status(200).json({
                        msg: "verified"
                })
        }
        catch (err){
                res.status(500).json({
                        msg:"user_not_verified"
                })
        }
})

module.exports={
        router
}