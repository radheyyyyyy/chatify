

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Landing } from "./pages/Landing";
import Chat from "./pages/Chat";
import { ChatPage } from "./pages/ChatPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/chat" element={<Chat/>}/>
                <Route path="/chatpage/:userId" element={<ChatPage/>}/>
            </Routes>
            
        </BrowserRouter>
    );
}

export default App;
