import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Clear the URL immediately
        if (window.history.replaceState) {
          window.history.replaceState({}, document.title, "/auth/callback");
        }

        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          toast.error("Authentication failed: " + error.message);
          navigate("/signin", { replace: true });
          return;
        }

        if (session) {
          // Store session securely
          localStorage.setItem(
            "user",
            JSON.stringify({
              id: session.user.id,
              email: session.user.email,
              name: session.user.user_metadata?.name,
            })
          );

          toast.success("Successfully signed in!");
          navigate("/home", { replace: true });
        } else {
          navigate("/signin", { replace: true });
        }
      } catch (error: any) {
        toast.error("Error processing authentication: " + error.message);
        navigate("/signin", { replace: true });
      }
    };

    handleCallback();
  }, [navigate, location]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">Completing sign in...</h2>
        <p className="text-gray-600">You will be redirected automatically.</p>
      </div>
    </div>
  );
};

export default AuthCallback;
