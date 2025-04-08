
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Index from '@/pages/Index';
import LikedPage from '@/pages/LikedPage';
import SignIn from '@/pages/SignIn';
import NotFound from '@/pages/NotFound';
import TermsPage from '@/pages/TermsPage';
import LandingPage from '@/pages/LandingPage';
import QuizPage from '@/pages/QuizPage';
import RecommendationsPage from '@/pages/RecommendationsPage';
import ProfilePage from '@/pages/ProfilePage';
import { TooltipProvider } from '@/components/ui/tooltip';
import './App.css';
import { Toaster } from '@/components/ui/sonner';

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
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <TooltipProvider>
        <AnimatedRoutes />
      </TooltipProvider>
      <Toaster />
    </Router>
  );
}

export default App;
