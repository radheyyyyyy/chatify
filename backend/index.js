const express = require("express");
const { router } = require("./Routers/mainRouter");
const { PORT, JWT_SECRET } = require("./config");
const { WebSocketServer } = require("ws");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const {PrismaClient} = require("@prisma/client");
const app = express();
const prisma=new PrismaClient();
app.use(express.json());
app.use(cors());
//route to "http://localhost:3000/chatify/..."
app.use("/chatify", router);

const httpServer = app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});

//Global catch
app.use((err, req, res, next) => {
    res.json({
        msg: "Server is under maintenance",
    });
});

//WEBSOCKET LOGIC
const onlineUsers = new Map();

const wss = new WebSocketServer({ server: httpServer });
wss.on("connection", (ws) => {
    ws.on("error", (err) => {
        console.error("Websocket error: " + err);
    });
    ws.on("message", (msg) => {
        const data = JSON.parse(msg);

        if (data.type === "register") {
            try {
                const email=jwt.decode(data.userid);
                jwt.verify(data.userid, JWT_SECRET);
                if (!email) return;
                ws.id = email.email;
                onlineUsers.set(email.email, ws);
                console.log(onlineUsers);
                if(onlineUsers.has(data.toUserId)){
                    ws.send(JSON.stringify({type:"active",user:"online"}))
                }
                else {
                    ws.send(JSON.stringify({type:"active",user:"Offline"}))
                }

                
            } catch (error) {
                console.log(error);
                ws.send("jwt failed");
            }
        } else if (data.type === "send") {
            const fromUserId=jwt.decode(data.fromUserId).email;
            if (data.toUserId && data.message) {
                if (onlineUsers.has(data.toUserId.email)) {
                    const toUser = onlineUsers.get(data.toUserId.email);
                    const message = data.message;
                    toUser.send(JSON.stringify({ type:"reply",msg: message }));
                } else {
                    ws.send(JSON.stringify({ type:"active",msg: "user_not_online" }));
                }
                prisma.chats.create({
                    data:{
                        fromUser:fromUserId,
                        toUser:data.toUserId.email,
                        message:data.message
                    }
                }).then(()=>{
                    console.log("chat stored");
                })
            } else {
                ws.send(JSON.stringify({ msg: "invalid_input" }));
            }
        }
    });
    ws.on("close", () => {
        onlineUsers.delete(ws.id);
    });
});
