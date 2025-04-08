
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Index from '@/pages/Index';
import LikedPage from '@/pages/LikedPage';
import SignIn from '@/pages/SignIn';
import NotFound from '@/pages/NotFound';
import TermsPage from '@/pages/TermsPage';
import LandingPage from '@/pages/LandingPage';
import QuizPage from '@/pages/QuizPage';
import RecommendationsPage from '@/pages/RecommendationsPage';
import { TooltipProvider } from '@/components/ui/tooltip';
import './App.css';
import { Toaster } from '@/components/ui/sonner';
import Sidebar from '@/components/Sidebar';

// Create a layout component that includes the sidebar
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-14 transition-all duration-300">
        {children}
      </div>
    </div>
  );
};

function AnimatedRoutes() {
  const location = useLocation();
  
  // Pages that should have the sidebar
  const pagesWithSidebar = ['/home', '/liked', '/profile'];
  const shouldShowSidebar = pagesWithSidebar.includes(location.pathname);
  
  // Wrap routes that need sidebar with the AppLayout component
  const renderRouteWithLayout = (element: React.ReactNode) => {
    return shouldShowSidebar ? <AppLayout>{element}</AppLayout> : element;
  };
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Index />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
        <Route path="/liked" element={<LikedPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Router>
        <AnimatedRoutes />
        <Toaster />
      </Router>
    </TooltipProvider>
  );
}

export default App;
