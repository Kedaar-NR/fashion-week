
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import FashionGrid from "@/components/FashionGrid";
import BrandSearchBar from "@/components/BrandSearchBar";
import TallyEmailWidget from "@/components/TallyEmailWidget";
import Sidebar from "@/components/Sidebar";
import BrandMarquee from "@/components/BrandMarquee";
import BrandCollage from "@/components/BrandCollage";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const resetSearch = () => {
    setSearchQuery("");
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
          <div className="mt-4 mb-2 px-4 flex justify-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center font-kanit">
              <span className="font-extrabold">GALLERY</span>
            </h1>
          </div>
          
          <div className="flex justify-center mb-3">
            <Button 
              onClick={handleDiscoverStyle}
              className="bg-black text-white hover:bg-gray-800 font-bold"
            >
              Discover Your Style
            </Button>
          </div>
          
          <div className="px-4 mb-3 animate-scale-in">
            <BrandSearchBar 
              onSearch={handleSearch} 
              onSelectBrand={(brand) => setSelectedBrand(brand)}
            />
          </div>

          <BrandMarquee onSelectBrand={setSelectedBrand} />
          <BrandCollage brand={selectedBrand} />
          
          <div className="flex-1 overflow-hidden">
            <FashionGrid 
              searchQuery={searchQuery}
              onResetSearch={resetSearch}
              onSelectBrand={(brand) => setSelectedBrand(brand)}
            />
          </div>
        </div>
        
        <TallyEmailWidget />
      </motion.div>
    </div>
  );
};

export default Index;
