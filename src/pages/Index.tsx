
import { useState, useEffect } from "react";
import { brands } from "@/data/brands";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Shirt } from "lucide-react";
import StyleQuiz from "@/components/StyleQuiz";
import FashionGrid from "@/components/FashionGrid";
import { Footerdemo } from "@/components/ui/footer-section";
import AISearchBar from "@/components/AISearchBar";
import TallyEmailWidget from "@/components/TallyEmailWidget";
import Sidebar from "@/components/Sidebar";

// Sort brands alphabetically
const brandsData = [...brands].sort((a, b) => a.name.localeCompare(b.name));

const Index = () => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [showStyleQuiz, setShowStyleQuiz] = useState(false);
  const [likedBrands, setLikedBrands] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    // Check if user has completed the quiz or previously seen the style quiz
    const hasCompletedQuiz = localStorage.getItem('hasCompletedQuiz');
    const hasSeenStyleQuiz = localStorage.getItem('hasSeenStyleQuiz');
    
    // Only show the quiz if neither condition is met
    if (!hasCompletedQuiz && !hasSeenStyleQuiz) {
      setShowStyleQuiz(true);
    }
    
    // Load liked brands from localStorage
    const saved = JSON.parse(localStorage.getItem('likedBrands') || '[]');
    setLikedBrands(saved);
  }, []);
  
  const handleCloseStyleQuiz = () => {
    setShowStyleQuiz(false);
    // Mark as seen so it doesn't show again
    localStorage.setItem('hasSeenStyleQuiz', 'true');
  };

  const handleOpenStyleQuiz = () => {
    setShowStyleQuiz(true);
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Close brand popup
  const closeInstagramView = () => {
    setSelectedBrand(null);
  };
  
  // Simplified brand popup UI with just the Instagram embed
  const renderBrandPopup = (brandName: string) => {
    const cleanBrandName = brandName.replace('@', '');
    
    return (
      <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
        <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold font-kanit">@{cleanBrandName}</h2>
            <button 
              onClick={closeInstagramView}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="rounded-xl overflow-hidden aspect-square w-full h-[70vh]">
            <iframe 
              src={`https://www.instagram.com/${cleanBrandName}/embed`}
              className="w-full h-full border-none" 
              title={`${brandName} Instagram Feed`}
              allowTransparency={true}
              scrolling="no"
              onError={(e) => {
                // If iframe fails to load, replace with fallback image
                const iframe = e.currentTarget;
                iframe.style.display = 'none';
                const container = document.createElement('div');
                container.className = 'w-full h-full flex items-center justify-center bg-gray-100';
                
                const iconWrapper = document.createElement('div');
                iconWrapper.className = 'flex flex-col items-center text-gray-500';
                
                const icon = document.createElement('div');
                icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shirt"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg>';
                iconWrapper.appendChild(icon);
                
                const text = document.createElement('p');
                text.className = 'mt-2';
                text.textContent = `@${cleanBrandName}`;
                iconWrapper.appendChild(text);
                
                container.appendChild(iconWrapper);
                iframe.parentNode?.appendChild(container);
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen font-kanit">
      <Sidebar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="h-screen flex flex-col font-kanit bg-white flex-1 ml-14 overflow-hidden"
      >
        <div className="flex flex-col h-full">
          <div className="mt-4 mb-2 px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center font-kanit">
              GALLERY
            </h1>
          </div>
          
          <div className="flex justify-center mb-3">
            <Button 
              onClick={handleOpenStyleQuiz}
              className="bg-black text-white hover:bg-gray-800"
            >
              Discover Your Style
            </Button>
          </div>
          
          <div className="px-4 mb-3 animate-scale-in">
            <AISearchBar onSearch={handleSearch} />
          </div>
          
          {selectedBrand ? (
            renderBrandPopup(selectedBrand)
          ) : (
            <div className="flex-1 overflow-hidden">
              <FashionGrid searchQuery={searchQuery} />
            </div>
          )}
        </div>
        
        <TallyEmailWidget />
        {showStyleQuiz && <StyleQuiz onClose={handleCloseStyleQuiz} />}
      </motion.div>
    </div>
  );
};

export default Index;
