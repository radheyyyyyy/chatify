
import { MessageSquare } from "lucide-react";
import { BrowserRouter, Route, Routes,Router, useNavigate } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Landing } from "./pages/Landing";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
            
        </BrowserRouter>
    );
}

export default App;
