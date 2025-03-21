const { Router } = require("express");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const z = require("zod");
const { SECRET_KEY, JWT_SECRET } = require("../config");
const { sendMail } = require("../nodemailer/nodemailer");
const router = new Router();
const prisma = new PrismaClient();
const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
});
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});
router.post("/signup", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    if (
        signupSchema.safeParse({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        }).success
    ) {
        try {
            const resp = await prisma.users.findUnique({
                where: { email: email },
            });
            if (!resp) {
                await prisma.users.create({
                    data: {
                        firstName,
                        lastName,
                        email,
                        password: hashedPassword,
                    },
                });
                await sendMail(email);
                res.status(201).json({
                    msg: "verify_first",
                });
            } else {
                res.json({
                    msg: "login_",
                });
            }
        } catch (err) {
            res.status(500).json({
                msg: "database is not online right now",
                err: err,
            });
        }
    } else {
        res.json({
            msg: "invalid_inputs",
        });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (loginSchema.safeParse({ email: email, password: password }).success) {
        let resp = await prisma.users.findUnique({
            where: { email },
        });
        console.log(resp)
        if (resp.email) {
            if (resp.isVerified) {
                const passwordMatch = await bcrypt.compare(password, resp.password);
                if (passwordMatch) {
                    try {
                        const token = jwt.sign({ email }, JWT_SECRET);
                        console.log(token);
                        
                        res.status(200).json({
                            msg: "success_login",
                            token:token,
                        });
                        return;
                    } catch (error) {
                        console.log(error);
                        res.json({
                            msg: "jwt failed",
                        });
                    }
                } else {
                    res.status(200).json({
                        msg: "incorrect_password",
                    });
                }
            } else {
                await sendMail(resp.email);
                res.status(200).json({
                    msg: "verify_first",
                });
            }
        } else {
            res.json({
                msg: "signup_first",
            });
        }
    } else {
        res.json({
            msg: "invalid_inputs",
        });
    }
});
router.get("/verify", async (req, res) => {
    const token = req.query.token;
    let decodedToken = jwt.decode(token);
    try {
        await jwt.verify(token, SECRET_KEY);
        await prisma.users.update({
            where: {
                email: decodedToken.email,
            },
            data: {
                isVerified: true,
            },
        });
        res.status(200).json({
            msg: "verified",
        });
    } catch (err) {
        res.status(500).json({
            msg: "user_not_verified",
        });
    }
});

router.get("/users",async (req,res)=>{
   const users= await prisma.users.findMany({select:{firstName:true,lastName:true,email:true}});
   res.status(200).json({
       users:users
   })
})
router.post("/search",async (req,res)=>{
    const {data}=req.body;
    const result=await prisma.users.findMany({
        where:{
            OR:[
                {firstName:{
                contains:data,
                mode:"insensitive"
            }},
                {
                    lastName:{
                        contains:data,
                        mode:"insensitive"
                    }
                }
            ]
        },
        select:{
            firstName:true,
            lastName:true,
            email:true
        }
    })
    console.log(result)
    res.json({
        result:result
    })
})

module.exports = {
    router,
};
