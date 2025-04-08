
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import FashionGrid from "@/components/FashionGrid";
import AISearchBar from "@/components/AISearchBar";
import TallyEmailWidget from "@/components/TallyEmailWidget";
import Sidebar from "@/components/Sidebar";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [selectedBrand, setSelectedBrand] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSelectBrand = (brand: any) => {
    setSelectedBrand(brand);
  };

  // Close brand popup
  const closeInstagramView = () => {
    setSelectedBrand(null);
  };
  
  const handleDiscoverStyle = () => {
    // Skip the initial popup and go directly to the quiz page
    navigate('/quiz');
  };
  
  // Render brand detail modal with Instagram embed and description
  const renderBrandPopup = () => {
    if (!selectedBrand) return null;
    
    const cleanBrandName = selectedBrand.title.replace('@', '');
    
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
          
          <div className="rounded-xl overflow-hidden aspect-square w-full h-[50vh]">
            <iframe 
              src={`https://www.instagram.com/${cleanBrandName}/embed`}
              className="w-full h-full border-none" 
              title={`${selectedBrand.title} Instagram Feed`}
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
          
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="text-gray-600">
              {selectedBrand.title} is a cutting-edge fashion brand known for its distinctive {selectedBrand.genre.toLowerCase()} style and innovative designs.
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
              <h4 className="text-lg font-medium text-gray-800">More details coming soon</h4>
              <p className="text-sm text-gray-500 mt-1">
                We're working on bringing you more information about this brand.
              </p>
            </div>
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
          <div className="mt-4 mb-2 px-4 flex justify-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center font-kanit">
              GALLERY
            </h1>
          </div>
          
          <div className="flex justify-center mb-3">
            <Button 
              onClick={handleDiscoverStyle}
              className="bg-black text-white hover:bg-gray-800"
            >
              Discover Your Style
            </Button>
          </div>
          
          <div className="px-4 mb-3 animate-scale-in">
            <AISearchBar onSearch={handleSearch} />
          </div>
          
          <div className="flex-1 overflow-hidden">
            <FashionGrid 
              searchQuery={searchQuery}
              onSelectBrand={handleSelectBrand}
            />
          </div>
        </div>
        
        <TallyEmailWidget />
        {selectedBrand && renderBrandPopup()}
      </motion.div>
    </div>
  );
};

export default Index;
