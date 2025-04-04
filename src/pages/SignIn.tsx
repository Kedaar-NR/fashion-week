
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SignIn = () => {
  const navigate = useNavigate();
  
  const handleGoogleSignIn = () => {
    // Mock Google sign-in for demonstration
    const avatarIndex = Math.floor(Math.random() * 1000);
    const randomName = ["Alex", "Jordan", "Taylor", "Casey", "Morgan", "Riley"][Math.floor(Math.random() * 6)];
    const randomLastname = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia"][Math.floor(Math.random() * 6)];
    
    const userData = {
      email: `${randomName.toLowerCase()}.${randomLastname.toLowerCase()}@gmail.com`,
      name: `${randomName} ${randomLastname}`,
      photoURL: `https://i.pravatar.cc/150?img=${avatarIndex}`
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    toast.success("Signed in with Google successfully!");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 ml-14 md:ml-48 flex flex-col p-8 items-center">
        <div className="w-full max-w-md mt-12">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-center">
              Welcome to Fashion Week
            </h1>
            <p className="text-gray-500 text-center mb-8">Sign in with Google to access your account</p>
            
            <Button 
              onClick={handleGoogleSignIn} 
              variant="outline"
              className="w-full h-12 mb-4 border-gray-200 flex items-center justify-center gap-3"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                  <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                  <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                  <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                </g>
              </svg>
              Continue with Google
            </Button>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                By signing in, you agree to our Terms and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
