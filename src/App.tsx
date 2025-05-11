import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "@/pages/Index";
import LikedPage from "@/pages/LikedPage";
import SignIn from "@/pages/SignIn";
import NotFound from "@/pages/NotFound";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import LandingPage from "@/pages/LandingPage";
import QuizPage from "@/pages/QuizPage";
import RecommendationsPage from "@/pages/RecommendationsPage";
import SwiperPage from "@/pages/SwiperPage";
import DropTracker from "@/pages/DropTracker";
import AuthCallback from "@/pages/AuthCallback";
import Gallery from "@/pages/Gallery";
import HowItWorks from "@/pages/HowItWorks";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./App.css";
import { Toaster } from "@/components/ui/sonner";
import Waitlist from "@/pages/Waitlist";
import Events from "@/pages/Events";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Index />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
        <Route path="/swiper" element={<SwiperPage />} />
        <Route path="/drop-tracker" element={<DropTracker />} />
        <Route path="/liked" element={<LikedPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/waitlist" element={<Waitlist />} />
        <Route path="/events" element={<Events />} />
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
