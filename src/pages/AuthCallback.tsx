import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          toast.error("Authentication failed: " + error.message);
          navigate("/signin");
          return;
        }

        if (session) {
          toast.success("Successfully signed in!");
          navigate("/home");
        } else {
          navigate("/signin");
        }
      } catch (error: any) {
        toast.error("Error processing authentication: " + error.message);
        navigate("/signin");
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">
          Processing authentication...
        </h2>
        <p className="text-gray-600">
          Please wait while we complete your sign-in.
        </p>
      </div>
    </div>
  );
};

export default AuthCallback;
