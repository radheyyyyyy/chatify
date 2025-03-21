import { useState, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";
import axios from "axios";

export default function ChatApp() {
    const [users, setUsers] = useState([]);
    const [searchInput,setSearchInput]=useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");
    const [loading, setLoading] = useState(true);  // Loading state
    const [ws,setWs]=useState(null);
    const [loadingForOnline,setLoadingForOnline] = useState(true);
    const [isOnline,setIsOnline] = useState("");
    // Fetch users when the component mounts
    useEffect(() => {
        axios.get("http://localhost:3000/chatify/users")
            .then((response) => {
                setUsers(response.data.users);
                setLoading(false);
            })
    }, []);

    if(ws){
    ws.onmessage=(event)=>{
        const message=JSON.parse(event.data);
        console.log(message);
        if(message.type==="reply"){
            setMessages([...messages,{text:message.msg,sender:"not_me"}]);
        }
        else  if(message.type==="active") {
            if(message.msg==="user_not_online"){
                setIsOnline("Offline")
            }
            else {
                setIsOnline(message.user)
                setLoadingForOnline(false);
            }
        }
    }}

    const handleSendMessage = () => {
        if (messageInput.trim() !== "") {
            setMessages([...messages, { text: messageInput, sender: "me" }]);
            setMessageInput("");
            ws.send(JSON.stringify({ type:"send",fromUserId:localStorage.getItem("token"),toUserId:selectedUser,message:messageInput }));

        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-1/3 bg-[#111B21] text-white p-4 border-r border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-bold">Chats</h1>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input type="search" id="default-search"
                                   onChange={(e)=>{setSearchInput(e.target.value)}}
                                   className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Search users..." required/>
                            <button type="submit"
                                    onClick={async ()=>{
                                        const res=await axios.post("http://localhost:3000/chatify/search",{
                                            data:searchInput
                                        })
                                        setUsers(res.data.result)
                                    }}
                                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search
                            </button>
                        </div>

                </div>
                <div>
                    {loading ? (
                        <p className="text-gray-400 text-center">
                            <div role="status" className='flex items-center justify-center w-full'>
                                <svg aria-hidden="true"
                                     className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                     viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"/>
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </p>
                    ) : users.length > 0 ? (
                        users.map((user) => (
                            <div
                                key={user.id}
                                onClick={() => {
                                    setSelectedUser(user)
                                    setMessages([]);
                                    setIsOnline("")
                                   const socket =new WebSocket("ws://localhost:3000/");
                                    setWs(socket);
                                    socket.onopen=()=>{
                                        socket.send(JSON.stringify({
                                            type:"register",
                                            userid:localStorage.getItem("token"),
                                            toUserId:user.email
                                        }))
                                    }
                                }}
                                className={`p-3 mb-3 cursor-pointer transition-all rounded-lg 
                            ${selectedUser?.id === user.id ? "bg-[#202C33]" : "bg-[#111B21]"} 
                            hover:bg-[#202C33]`}
                            >
                                <div>
                                    <p className="text-lg font-medium">{user.firstName} {user.lastName}</p>
                                </div>

                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 text-center">No users found</p>
                    )}
                </div>
            </div>

            {/* Chat Window */}
            <div className="w-2/3 flex flex-col bg-[#0B141A] text-white">
                {selectedUser ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 border-b h-18 border-gray-700 bg-[#202C33]">
                            <h2 className="text-lg font-semibold">{selectedUser.firstName} {selectedUser.lastName}</h2>
                            {loadingForOnline?<h1 className='text-sm text-gray-400'>{isOnline}</h1>:
                                <h1 className='text-sm text-gray-400'>{isOnline}</h1>}
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 p-4 overflow-y-auto">
                            {messages.map((msg, index) => (
                                <div key={index} className={`mb-2 ${msg.sender === "me" ? "text-right" : "text-left"}`}>
                                    <span className={`inline-block px-4 py-2 rounded-lg ${msg.sender === "me" ? "bg-green-500" : "bg-gray-700"}`}>{msg.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Message Input */}
                        <div className="p-4 flex items-center bg-[#202C33] border-t border-gray-700">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                className="flex-1 p-2 bg-[#2A3942] text-white rounded-lg focus:outline-none"
                            />
                            <button onClick={handleSendMessage} className="ml-3 bg-green-500 p-2 rounded-full text-white">
                                <FaPaperPlane />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-500">
                        Select a chat to start messaging
                    </div>
                )}
            </div>
        </div>
    );

}
