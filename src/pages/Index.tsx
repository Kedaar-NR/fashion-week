
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Heart } from "lucide-react";
import FashionGrid from "@/components/FashionGrid";
import BrandSearchBar from "@/components/BrandSearchBar";
import TallyEmailWidget from "@/components/TallyEmailWidget";
import Sidebar from "@/components/Sidebar";
import BrandContentCollage from "@/components/BrandContentCollage";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { brands } from "@/data/brands";

const Index = () => {
  const [selectedBrand, setSelectedBrand] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [likedBrands, setLikedBrands] = useState<string[]>(
    JSON.parse(localStorage.getItem('likedBrands') || '[]')
  );
  // Preload images for faster loading
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  const navigate = useNavigate();
  
  // Preload images
  useEffect(() => {
    const imagesToPreload = [
      "/lovable-uploads/c089b930-dc75-46ef-9215-b715c8db9998.png",
      "/lovable-uploads/af6b43c2-1726-43e7-9f87-e05c62462654.png",
      "/lovable-uploads/c31d83c0-c192-4591-9764-e23f7d781d15.png",
      "/lovable-uploads/7f9f0c7c-ccf2-4d04-829b-15ebcd6016c9.png",
      "/lovable-uploads/9936f1ac-b15f-4c46-ba42-28955f24eb6e.png",
      "/lovable-uploads/08e7edfb-caf9-4f66-bfd0-eba0b62239a2.png",
      // Add paths to the first image of each brand folder as well
      "/src/brand_content/Badson/badson.us_1699473586_3231741135639083877_1432091644.jpg",
      "/src/brand_content/Brotherly Love/brotherlylove_1664046007_2934553063320393525_35912611459.jpg",
      "/src/brand_content/Derschutze Clo/derschutze_clo_1726419603_3457780706064379282_2999154756.jpg",
      "/src/brand_content/nomaintenance/nomaintenance_1731181155_3497723502143598634_14713530917.jpg",
      "/src/brand_content/outlaw xyz/outlw.usa_1711911948_3336081677266137878_44746425000.jpg"
    ];
    
    const loadImage = (src: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = reject;
      });
    };
    
    Promise.all(imagesToPreload.map(src => loadImage(src)))
      .then(() => setImagesLoaded(true))
      .catch(err => console.error("Failed to preload images:", err));
  }, []);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const resetSearch = () => {
    setSearchQuery("");
  };

  const handleSelectBrand = (brand: any) => {
    setSelectedBrand(brand);
  };

  const handleSearchBrandSelect = (brandName: string) => {
    const brand = brands.find(b => b.name === brandName);
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
  
  const toggleLike = (brandTitle: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    const updatedLikes = likedBrands.includes(brandTitle)
      ? likedBrands.filter(name => name !== brandTitle)
      : [...likedBrands, brandTitle];
    
    setLikedBrands(updatedLikes);
    localStorage.setItem('likedBrands', JSON.stringify(updatedLikes));
    
    if (!likedBrands.includes(brandTitle)) {
      toast.success(`Added ${brandTitle} to your liked brands!`);
    }
  };
  
  const renderBrandPopup = () => {
    if (!selectedBrand) return null;
    
    const cleanBrandName = selectedBrand.title.replace('@', '');
    
    return (
      <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
        <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-3 bg-gray-300 flex items-center justify-center">
                <span className="font-bold text-white text-lg">{cleanBrandName.charAt(0).toUpperCase()}</span>
              </div>
              <h2 className="text-2xl font-bold font-kanit">@{cleanBrandName}</h2>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={(e) => toggleLike(selectedBrand.title, e)}
                className="bg-white p-2 rounded-full shadow-sm hover:bg-gray-100"
              >
                <Heart 
                  size={20} 
                  className={likedBrands.includes(selectedBrand.title) ? "fill-red-500 text-red-500" : "text-gray-500"}
                />
              </button>
              <button 
                onClick={closeInstagramView}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          
          <div className="rounded-xl overflow-hidden aspect-square w-full h-[60vh]">
            <iframe 
              src={`https://www.instagram.com/${cleanBrandName}/embed`}
              className="w-full h-full border-none" 
              title={`${selectedBrand.title} Instagram Feed`}
              allowTransparency={true}
              scrolling="no"
              loading="eager"
              onError={(e) => {
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
          
          <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
            <h4 className="text-lg font-medium text-gray-800">More details coming soon</h4>
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
              onSelectBrand={handleSearchBrandSelect}
            />
          </div>
          
          {/* Brand content collage */}
          <div className="px-4 overflow-auto">
            <BrandContentCollage />
          </div>
          
          <div className="flex-1 overflow-hidden">
            <FashionGrid 
              searchQuery={searchQuery}
              onSelectBrand={handleSelectBrand}
              onResetSearch={resetSearch}
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
