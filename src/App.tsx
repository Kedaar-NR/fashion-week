
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import Index from '@/pages/Index';
import LikedPage from '@/pages/LikedPage';
import SignIn from '@/pages/SignIn';
import NotFound from '@/pages/NotFound';
import TermsPage from '@/pages/TermsPage';
import LandingPage from '@/pages/LandingPage';
import QuizPage from '@/pages/QuizPage';
import RecommendationsPage from '@/pages/RecommendationsPage';
import './App.css';

function AnimatedRoutes() {
  const location = useLocation();
  
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
    <AuthProvider>
      <TooltipProvider>
        <Router>
          <AnimatedRoutes />
          <Toaster />
        </Router>
      </TooltipProvider>
    </AuthProvider>
  );
}

export default App;
