
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkLoaded, ClerkLoading } from '@clerk/clerk-react';
import Index from '@/pages/Index';
import BrandsPage from '@/pages/BrandsPage';
import LikedPage from '@/pages/LikedPage';
import SignIn from '@/pages/SignIn';
import NotFound from '@/pages/NotFound';
import TermsPage from '@/pages/TermsPage';
import { ClerkCallback } from '@/components/ClerkCallback';
import './App.css';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <Router>
      <ClerkLoading>
        <div className="flex min-h-screen items-center justify-center">
          <div className="w-12 h-12 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
        </div>
      </ClerkLoading>
      <ClerkLoaded>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/liked" element={<LikedPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/sso-callback" element={<ClerkCallback />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </ClerkLoaded>
    </Router>
  );
}

export default App;
