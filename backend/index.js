const express=require("express");
const {router} = require("./Routers/mainRouter");
const {PORT} = require("./config");

const app = express();
app.use(express.json());
//route to "http://localhost:3000/chatify/..."
app.use("/chatify",router)


app.listen(PORT,()=>{
    console.log("Server is running on port "+PORT);
})

//Global catch
app.use((err,req,res,next)=>{
    res.json({
        msg:"Server is under maintenance"
    })
})