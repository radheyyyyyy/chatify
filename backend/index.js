const express = require("express");
const { router } = require("./Routers/mainRouter");
const { PORT, JWT_SECRET } = require("./config");
const { WebSocketServer } = require("ws");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();

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
    console.log("new_user_connected");
    ws.on("error", (err) => {
        console.error("Websocket error: " + err);
    });
    ws.on("message", (msg) => {
        const data = JSON.parse(msg);

        if (data.type === "register") {
            try {
                const { email } = jwt.verify(data.userid, JWT_SECRET);
                if (!email) return;
                ws.id = email;
                onlineUsers.set(email, ws);
                console.log([...onlineUsers.keys()]);
                
                
            } catch (error) {
                console.log(error);
                msg.send("jwt failed");
                return;
            }
        } else if (data.type === "send") {
            if (data.toUserId && data.message) {
                if (onlineUsers.has(data.toUserId)) {
                    const toUser = onlineUsers.get(data.toUserId);
                    
                    const message = data.message;
                    toUser.send(JSON.stringify({ msg: message }));
                } else {
                    ws.send(JSON.stringify({ msg: "user_not_online" }));
                }
            } else {
                ws.send(JSON.stringify({ msg: "invalid_input" }));
            }
        }
    });
    ws.on("close", () => {
        onlineUsers.delete(ws.id);
    });
    ws.send("connected");
});
