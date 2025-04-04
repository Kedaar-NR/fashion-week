
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useClerk } from "@clerk/clerk-react";

export const ClerkCallback = () => {
  const navigate = useNavigate();
  const { handleRedirectCallback } = useClerk();

  useEffect(() => {
    // Show a loading toast
    toast.loading("Finishing authentication...");
    
    async function processCallback() {
      try {
        // Handle the callback from Clerk
        await handleRedirectCallback({
          afterSignInUrl: "/",
          afterSignUpUrl: "/"
        });
        toast.success("Authentication successful!");
      } catch (error) {
        console.error("Error during authentication callback:", error);
        toast.error("Authentication failed. Please try again.");
        navigate("/signin");
      }
    }
    
    processCallback();
  }, [navigate, handleRedirectCallback]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mx-auto mb-4"></div>
        <h1 className="text-2xl font-semibold mb-2">Completing Sign In</h1>
        <p className="text-gray-600">Please wait while we authenticate your account...</p>
      </div>
    </div>
  );
};
