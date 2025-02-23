import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export const ChatPage = () => {
    const {userId} = useParams();
    const [chats, setChats] = useState([]);
    const [socket, setSocket] = useState();
    const inputRef = useRef();
    
    
    const navigate = useNavigate();
    if (!localStorage.getItem("token")) {
        alert("Please Sign in");
        navigate("/signin");
    }
    useEffect(() => {
        const wss = new WebSocket("ws://localhost:3000");
        wss.onopen = () => {
            setSocket(wss);
            wss.send(
                JSON.stringify({
                    type: "register",
                    userid: localStorage.getItem("token"),
                })
            );
        };
        wss.onmessage = (e) => {
            const parsedMessage = JSON.parse(e.data);
            if (e.data.msg === "user_not_online") {
                alert("User is not online");
                return;
            } else if (e.data.msg === "invalid_input") {
                alert("Invalid input");
                return;
            }
            else
            setChats((c) => [...c, parsedMessage.msg]);
        };
        return () => {
            wss.close();
        };
    }, []);
    return (
        <div className="w-screen h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex-col justify-end">
            <div className="h-[90%]">
                {chats.map((x, i) => (
                    <div key={`temp${i}`}>{x}</div>
                ))}
            </div>
            <div className="flex items-stretch w-screen justify-center gap-5">
                <Input type="text" reference={inputRef} />
                <Button
                    variant="large"
                    text="Send"
                    onClick={() => {
                        setChats((c)=>[...c,inputRef.current.value])
                        socket.send(
                            JSON.stringify({
                                type: "send",
                                toUserId: userId,
                                message: inputRef.current.value,
                            })
                        );
                    }}
                />
            </div>
        </div>
    );
};
