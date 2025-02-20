import { Input } from "./Input";

export const Auth = ({ type }) => {
    return (
        <div className="flex justify-center h-screen w-screen items-center">
            <h1>{type == "signup" ? "Sign Up" : "Sign In"}</h1>
            {type == "signup" && (
                <div>
                   <Input type="text"/>
                </div>
            )}
            {type == "signup" && (
                <div>
                    <input type="text" placeholder="Last Name" className="p-2" />
                </div>
            )}
            <div>
                <input type="email" placeholder="Email Name" className="p-2" />
            </div>
            <div>
                <input type="password" placeholder="Password" className="p-2" />
            </div>

        </div>
    );
};
