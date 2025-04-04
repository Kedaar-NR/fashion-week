
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For demonstration, just show a toast and save user to localStorage
    if (isSignUp) {
      localStorage.setItem('user', JSON.stringify({ email }));
      toast.success("Account created successfully! You can now sign in.");
      setIsSignUp(false);
    } else {
      localStorage.setItem('user', JSON.stringify({ email }));
      toast.success("Signed in successfully!");
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 ml-14 md:ml-48 flex flex-col p-8 items-center">
        <div className="w-full max-w-md mt-12">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-center">
              {isSignUp ? "Create an Account" : "Welcome Back"}
            </h1>
            <p className="text-gray-500 text-center mb-8">{isSignUp ? "Sign up to explore your favorite brands" : "Sign in to access your saved brands"}</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12"
                />
              </div>
              
              <Button type="submit" className="w-full h-12 bg-black hover:bg-gray-800 text-white">
                {isSignUp ? "Create Account" : "Sign In"}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <button 
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-purple-600 hover:underline text-sm"
              >
                {isSignUp 
                  ? "Already have an account? Sign In" 
                  : "Don't have an account? Sign Up"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
