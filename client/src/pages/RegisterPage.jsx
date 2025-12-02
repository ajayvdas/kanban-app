import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export default function RegisterPage() {
    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <div className="p-4 border shadow-md rounded-md min-w-sm">
                <h1 className="text-3xl font-bold mb-6 text-center">Create Account</h1>

                <div className="mb-4">
                    <Label className="mb-2">Username</Label>
                    <Input type="text" placeholder="Username" />
                </div>

                <div className="mb-4">
                    <Label className="mb-2">Email</Label>
                    <Input type="text" placeholder="you@example.com" />
                </div>

                <div className="mb-4">
                    <Label className="mb-2">Password</Label>
                    <Input className="" placeholder="******" />
                </div>

                <div className="mb-4">
                    <Button className="w-full">Sign Up</Button>
                </div>
                <p className="text-center mb-4">
                    Don't have an account? <Link to='/login' >Sign in</Link>
                </p>
            </div>
        </div>
    );
}
