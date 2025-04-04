
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { initStack } from "@stackframe/init-stack";

const auth = initStack({
  providers: ["credentials", "github", "google"],
});

const SignIn = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/');
    }
  }, [navigate]);
  
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (!email || !password) {
        toast.error("Please enter both email and password");
        setIsLoading(false);
        return;
      }
      
      // Simple validation
      if (!email.includes('@')) {
        toast.error("Please enter a valid email");
        setIsLoading(false);
        return;
      }
      
      if (isSignUp) {
        // Handle sign up
        if (!name) {
          toast.error("Please enter your name");
          setIsLoading(false);
          return;
        }
        
        await auth.signUp({
          email,
          password,
          metadata: { name }
        });
        
        toast.success("Account created successfully!");
        toast("Redirecting to your account...");
        
        // Create a user object
        const user = {
          name: name,
          email: email,
          photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
        };
        
        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        // Handle sign in
        await auth.signIn({
          email,
          password
        });
        
        // Create a user object
        const user = {
          name: email.split('@')[0],
          email: email,
          photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
        };
        
        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        
        toast.success("Signed in successfully!");
        toast("Redirecting to your account...");
      }
      
      // Redirect after a short delay
      setTimeout(() => {
        setIsLoading(false);
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error(isSignUp 
        ? "Failed to create account. Please try again."
        : "Invalid email or password. Please try again.");
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "github" | "google") => {
    setIsLoading(true);
    
    try {
      await auth.signIn({ provider });
      
      // The rest will be handled by the redirect flow
      toast.success("Redirecting to authentication provider...");
    } catch (error) {
      console.error("Social authentication error:", error);
      toast.error(`Failed to sign in with ${provider}. Please try again.`);
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 ml-14 md:ml-48 flex flex-col p-8 items-center">
        <div className="w-full max-w-md mt-12">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-center font-kanit">
              {isSignUp ? "Create your account" : "Welcome back"}
            </h1>
            <p className="text-gray-500 text-center mb-8">
              {isSignUp ? "Sign up to start your fashion journey" : "Sign in to access your account"}
            </p>
            
            <form onSubmit={handleEmailSignIn} className="space-y-4 mb-6">
              {isSignUp && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="pl-10 w-full"
                    />
                  </div>
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="pl-10 w-full"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 pr-10 w-full"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              
              <Button 
                type="submit"
                className="w-full h-12"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-t-2 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                ) : (
                  isSignUp ? "Create Account" : "Sign In"
                )}
              </Button>
            </form>
            
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <div className="flex flex-col space-y-3">
              <Button 
                onClick={() => handleSocialSignIn("google")}
                variant="outline"
                disabled={isLoading}
                className="w-full h-12 mb-2 border-gray-200 flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-t-2 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                        <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                        <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                        <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                        <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                      </g>
                    </svg>
                    Continue with Google
                  </>
                )}
              </Button>
              
              <Button 
                onClick={() => handleSocialSignIn("github")}
                variant="outline"
                disabled={isLoading}
                className="w-full h-12 border-gray-200 flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-t-2 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path 
                        fill="currentColor"
                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                      />
                    </>
                  GitHub
                </>
              )}
            </Button>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                {isSignUp ? "Already have an account?" : "Don't have an account yet?"}{" "}
                <button 
                  onClick={() => setIsSignUp(!isSignUp)} 
                  className="text-blue-500 hover:text-blue-600 font-medium"
                >
                  {isSignUp ? "Sign in" : "Sign up"}
                </button>
              </p>
              <p className="text-xs text-gray-400 mt-4">
                By signing in/up, you agree to our Terms and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
