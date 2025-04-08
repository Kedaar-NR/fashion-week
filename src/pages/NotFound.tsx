
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: Page not found");
    
    // Redirect back to main homepage after 3 seconds
    const timer = setTimeout(() => {
      navigate("/home");
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <p className="text-gray-500 mb-4">Redirecting to home page...</p>
        <button 
          onClick={() => navigate("/home")} 
          className="text-blue-500 hover:text-blue-700 underline"
        >
          Go to Home Now
        </button>
      </div>
    </div>
  );
};

export default NotFound;
