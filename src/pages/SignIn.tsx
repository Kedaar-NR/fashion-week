
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useClerk, useUser, useSignIn, useSignUp } from "@clerk/clerk-react";

const SignIn = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const { isSignedIn, user } = useUser();
  const { signIn, setActive } = useSignIn();
  const { signUp } = useSignUp();
  const clerk = useClerk();
  
  useEffect(() => {
    // Check if user is already logged in
    if (isSignedIn && user) {
      navigate('/');
    }
  }, [isSignedIn, user, navigate]);
  
  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn?.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/"
      });
    } catch (error) {
      console.error("OAuth error:", error);
      toast.error("Failed to sign in with Google");
      setIsLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
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
    
    try {
      if (isSignUp) {
        // Fixed: Using the signUp hook instead of accessing it on clerk object
        const result = await signUp.create({
          emailAddress: email,
          password,
          firstName: name || undefined,
        });
        
        await result.prepareEmailAddressVerification({
          strategy: "email_code"
        });
        
        toast.success("Verification email sent! Please check your inbox.");
      } else {
        const result = await signIn?.create({
          identifier: email,
          password,
        });
        
        if (result?.status === "complete") {
          await setActive({ session: result.createdSessionId });
          toast.success("Signed in successfully!");
          navigate("/");
        } else {
          console.error("Sign in failed:", result);
          toast.error("Failed to sign in");
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error(isSignUp ? "Failed to create account" : "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
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
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full"
                  />
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full"
                />
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
            
            <Button 
              onClick={handleGoogleSignIn} 
              variant="outline"
              disabled={isLoading}
              className="w-full h-12 mb-4 border-gray-200 flex items-center justify-center gap-3"
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
