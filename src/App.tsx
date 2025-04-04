
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LikedPage from "./pages/LikedPage";
import BrandsPage from "./pages/BrandsPage";
import SignIn from "./pages/SignIn";

const queryClient = new QueryClient();

const App = () => {
  // Add Kanit font to the document
  useEffect(() => {
    // Create a link element for the Google Font
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap';
    
    // Add it to the document head
    document.head.appendChild(link);
    
    // Add the font-family to the body
    document.body.style.fontFamily = "'Kanit', sans-serif";
    
    // Clean up function
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/liked" element={<LikedPage />} />
            <Route path="/brands" element={<BrandsPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/profile" element={<SignIn />} /> {/* Reuse SignIn component for profile temporarily */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
