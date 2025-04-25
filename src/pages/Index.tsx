
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import FashionGrid from "@/components/FashionGrid";
import BrandSearchBar from "@/components/BrandSearchBar";
import TallyEmailWidget from "@/components/TallyEmailWidget";
import Sidebar from "@/components/Sidebar";
import BrandContentCollage from "@/components/BrandContentCollage";
import { useNavigate } from "react-router-dom";
import { brands } from "@/data/brands";
import MarqueeSlider from '@/components/MarqueeSlider';

const Index = () => {
  const [selectedBrand, setSelectedBrand] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const resetSearch = () => {
    setSearchQuery("");
  };

  const handleBrandSelect = (brandName: string) => {
    const brand = brands.find(b => b.name === `@${brandName}`);
    if (brand) {
      const brandItem = {
        id: brands.indexOf(brand) + 1,
        title: brand.name,
        genre: brand.genre?.toUpperCase() || "STREET",
        image: `https://placeholder.pics/svg/300x300/DEDEDE/555555/${brand.name}`,
        followers: brand.followers
      };
      setSelectedBrand(brandItem);
    }
  };

  const closeInstagramView = () => {
    setSelectedBrand(null);
  };
  
  const handleDiscoverStyle = () => {
    navigate('/quiz');
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
          <h1 className="text-3xl font-bold text-center mt-8 mb-4 text-black">Gallery</h1>
          
          <div className="flex justify-center mb-6">
            <Button 
              onClick={handleDiscoverStyle}
              className="bg-black text-white hover:bg-gray-800 font-bold"
            >
              Discover Your Style
            </Button>
          </div>

          <MarqueeSlider onSelectBrand={handleBrandSelect} />
          
          <div className="px-4 overflow-auto">
            <BrandContentCollage />
          </div>
          
          <div className="px-4 mb-3 animate-scale-in">
            <BrandSearchBar 
              onSearch={handleSearch} 
              onSelectBrand={handleBrandSelect}
            />
          </div>
          
          <div className="flex-1 overflow-hidden">
            <FashionGrid 
              searchQuery={searchQuery}
              onSelectBrand={setSelectedBrand}
              onResetSearch={resetSearch}
            />
          </div>
        </div>
        
        <TallyEmailWidget />
        {selectedBrand && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">@{selectedBrand.title.replace('@', '')}</h2>
                <button 
                  onClick={closeInstagramView}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="rounded-xl overflow-hidden aspect-square w-full h-[60vh]">
                <iframe 
                  src={`https://www.instagram.com/${selectedBrand.title.replace('@', '')}/embed`}
                  className="w-full h-full border-none" 
                  title={`${selectedBrand.title} Instagram Feed`}
                  loading="eager"
                />
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Index;
