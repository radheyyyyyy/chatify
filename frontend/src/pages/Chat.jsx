import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useRef } from "react";
export default function Chat() {
    const navigate = useNavigate();
    if (!localStorage.getItem("token")) {
        alert("Please Sign in");
        navigate("/signin");
    }

    const inputRef = useRef();
    return (
        <>
            <div>
                <p>Enter user id you want to chat with</p>
                <Input type="email" reference={inputRef} placeholder="Enter userid/email" />
                <Button
                    text="Chat"
                    onClick={() => {
                        navigate(`/chatpage/${inputRef.current.value}`);
                    }}
                />
            </div>
        </>
    );
}
