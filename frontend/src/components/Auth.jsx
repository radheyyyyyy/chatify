import { useRef } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Auth = ({ type }) => {
    const firstName = useRef();
    const lastName = useRef();
    const password = useRef();
    const email = useRef();
    const confirmpass = useRef();
    const navigate = useNavigate();

    return (
        <div className="flex h-screen w-screen justify-center items-center bg-black relative overflow-hidden">
            {/* Futuristic Animated Background */}
            <div className="absolute inset-0 bg-[url('/cyber-matrix.gif')] opacity-20 blur-sm"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/20 via-purple-700/30 to-black"></div>

            {/* Neon Tech Card */}
            <div className="relative z-10 bg-gray-900 bg-opacity-90 p-10 rounded-2xl shadow-[0_0_20px_rgba(138,43,226,0.6)] max-w-md w-full mx-4 border border-purple-500 backdrop-blur-lg">
                <h1 className="text-4xl font-extrabold text-white text-center mb-8 tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                    {type === "signup" ? "CREATE ACCOUNT" : "WELCOME BACK"}
                </h1>
                <div className="space-y-2  w-full">
                    {type === "signup" && <Input type="text" placeholder="First Name" reference={firstName} />}
                    {type === "signup" && <Input type="text" placeholder="Last Name" reference={lastName} />}
                    <Input type="email" placeholder="Email" reference={email} />
                    <Input type="password" placeholder="Password" reference={password} />
                    {type === "signup" && <Input type="password" placeholder="Confirm Password" reference={confirmpass} />}
                </div>
                <div className="mt-3 flex justify-center">
                    {type === "signup" ? (
                        <Button
                            text="Sign Up"
                            className="w-full bg-purple-600 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(138,43,226,0.8)] hover:shadow-[0_0_15px_rgba(255,105,180,0.8)]"
                            onClick={async () => {
                                if (confirmpass.current.value === password.current.value) {
                                    const response = await axios.post(`${BACKEND_URL}/signup`, {
                                        firstName: firstName.current.value,
                                        lastName: lastName.current.value,
                                        email: email.current.value,
                                        password: password.current.value,
                                    });
                                    if (response.status === 201) {
                                        alert(`Verification link sent to ${email.current.value}`);
                                        navigate("/signin");
                                    }
                                } else {
                                    alert("Passwords do not match");
                                }
                            }}
                        />
                    ) : (
                        <Button
                            text="Sign In"
                            className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(0,191,255,0.8)] hover:shadow-[0_0_15px_rgba(65,105,225,0.8)]"
                            onClick={async () => {
                                const response = await axios.post(`${BACKEND_URL}/login`, {
                                    email: email.current.value.trim(),
                                    password: password.current.value.trim(),
                                });
                                if (response.data.msg === "verify_first") {
                                    alert("Please verify your email");
                                    return;
                                } else if (response.data.msg === "incorrect_password") {
                                    alert("Invalid Credentials");
                                    return;
                                } else if (response.data.msg === "invalid_inputs") {
                                    alert("Invalid Inputs");
                                    return;
                                } else if (response.data.msg === "signup_first") {
                                    alert("Please Sign Up");
                                    return;
                                }
                                localStorage.setItem("token", response.data.token);
                                navigate("/chat");
                            }}
                        />
                    )}
                </div>
                <p className="text-gray-400 text-center mt-4">
                    {type === "signup" ? "Already have an account? " : "Don't have an account? "}
                    <span
                        className="text-purple-400 cursor-pointer hover:underline hover:text-purple-200 transition-all"
                        onClick={() => navigate(type === "signup" ? "/signin" : "/signup")}
                    >
                        {type === "signup" ? "Sign In" : "Sign Up"}
                    </span>
                </p>
            </div>
        </div>
    );
};