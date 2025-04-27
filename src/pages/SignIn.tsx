import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

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
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
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
      if (!email.includes("@")) {
        toast.error("Please enter a valid email");
        setIsLoading(false);
        return;
      }
      if (isSignUp) {
        if (!name) {
          toast.error("Please enter your name");
          setIsLoading(false);
          return;
        }
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { name } },
        });
        if (error) {
          toast.error(error.message);
          setIsLoading(false);
          return;
        }
        toast.success("Account created! Please check your email to confirm.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          toast.error(error.message);
          setIsLoading(false);
          return;
        }
        toast.success("Signed in successfully!");
      }
      setTimeout(() => {
        setIsLoading(false);
        navigate("/");
      }, 1500);
    } catch (error: any) {
      toast.error(error.message || "Authentication error");
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "github" | "google") => {
    setIsLoading(true);

    try {
      // Simulate authentication delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you would integrate with the provider's OAuth flow
      // For demo purposes, we'll create a dummy user
      const user = {
        name: `${provider} User`,
        email: `${provider.toLowerCase()}user@example.com`,
        photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${provider}`,
      };

      // Store in localStorage
      localStorage.setItem("user", JSON.stringify(user));

      toast.success(`Signed in with ${provider} successfully!`);
      toast("Redirecting to your account...");

      // Redirect after a short delay
      setTimeout(() => {
        setIsLoading(false);
        navigate("/");
      }, 1500);
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
      <div className="flex-1 flex items-center justify-center p-4 ml-0 md:ml-48">
        <div className="w-full max-w-md flex flex-col items-center justify-center">
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="light"
            providers={[]}
            onlyThirdPartyProviders={false}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
