import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterMutation } from "@/features/api/apiSlice";
import { setCredentials } from "@/features/auth/authSlice";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [register, { isLoading, error }] = useRegisterMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const user = await register({ username, email, password }).unwrap();
            dispatch(setCredentials(user));
            navigate("/");
        } catch (err) {
            console.error("Failed to register: ", err);
        }
    }
    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <div className="p-4 border shadow-md rounded-md min-w-sm">
                <h1 className="text-3xl font-bold mb-6 text-center">Create Account</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Label className="mb-2">Username</Label>
                        <Input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <Label className="mb-2">Email</Label>
                        <Input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <Label className="mb-2">Password</Label>
                        <Input
                            type="password"
                            className=""
                            placeholder="******"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && (
                        <div className="text-red-400 text-sm text-center bg-red-400/10 p-2 rounded-md mb-4">
                            {error?.data?.message || "Registration failed"}
                        </div>
                    )}

                    <div className="mb-4">
                        <Button type="submit" className="w-full">
                            {isLoading ? <Loader2 className="animate-spin" /> : "Sign Up"}
                        </Button>
                    </div>
                    <p className="text-center mb-4">
                        Don't have an account? <Link to="/login">Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
