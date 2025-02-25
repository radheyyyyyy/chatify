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
        <div className="flex h-screen w-screen justify-center items-center">
            <div>
                <h1 className="mb-5 text-center mr-2 text-2xl">{type === "signup" ? "Sign Up" : "Sign In"}</h1>
                {type === "signup" && <Input type="text" placeholder="First Name" reference={firstName} />}
                {type === "signup" && <Input type="text" placeholder="Last Name" reference={lastName} />}
                <Input type="email" placeholder="Email" reference={email} />
                <Input type="password" placeholder="Password" reference={password} />
                {type === "signup" && <Input type="password" placeholder="Confirm Password" reference={confirmpass} />}
                {type === "signup" ? (
                    <Button
                        text="Sign Up"
                        onClick={async () => {
                            if (confirmpass.current.value === password.current.value) {
                                const response = await axios.post(`${BACKEND_URL}/signup`, {
                                    firstName: firstName.current.value.trim(),
                                    lastName: lastName.current.value.trim(),
                                    email: email.current.value.trim(),
                                    password: password.current.value.trim(),
                                });
                                if (response.data.msg === "verify_first") {
                                    alert(`Email Verification Link is sent on email ${email.current.value}`);
                                    navigate("/signin");
                                }
                                else if(response.data.msg === "invalid_inputs"){
                                    alert("Please enter valid inputs");
                                }
                                else {
                                    alert("Server is under maintenance")
                                }
                            } else {
                                alert("Password does not match");
                            }
                        }}
                    />
                ) : (
                    <Button
                        text="Sign In"
                        onClick={async () => {
                            const response = await axios.post(`${BACKEND_URL}/login`, {
                                email: email.current.value.trim(),
                                password: password.current.value.trim(),
                            });
                            if (response.data.msg === "verify_first") {
                                alert("Please verify your email");
                                return;
                            }
                            else if (response.data.msg=== "invalid_inputs"){
                                alert("Please enter valid inputs");
                            }
                            else if(response.data.msg==="signup_first"){
                                alert("Please sign up first");
                                navigate("/signup");
                            }
                            else if (response.data.msg=== "incorrect_password") {
                                alert("Invalid Credentials");
                                return;
                            }
                            const token = response.data.token;
                            localStorage.setItem("token", token);
                            navigate("/")
                        }}
                    />
                )}
            </div>
        </div>
    );
};
