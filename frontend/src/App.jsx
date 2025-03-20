

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Landing } from "./pages/Landing";
import Chat from "./pages/Chat";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/chat" element={<Chat/>}/>
                </Routes>
            
        </BrowserRouter>
    );
}

export default App;
