import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { brands, genreColors } from "@/data/brands";
import { Heart, Instagram, RefreshCw, Shirt } from "lucide-react";
import MarqueeCategories from "./MarqueeCategories";
import { Button } from "./ui/button";

const getBrandWebsiteUrl = (brandName: string) => {
  const websiteUrls: Record<string, string> = {
    "aliasonline.us": "https://aliasonline.us",
    "vicinity_de": "https://vicinity.de",
    "gospel.core": "https://gospelcore.com",
    "somar.us": "https://somar.us",
    "berlinc.co": "https://berlinc.co",
    "sixshooter.us": "https://sixshooter.us",
  };
  
  return websiteUrls[brandName] || null;
};

const fashionItems = brands.map((brand, index) => ({
  id: index + 1,
  title: brand.name,
  genre: brand.genre?.toUpperCase() || "STREET",
  image: `https://placeholder.pics/svg/300x300/DEDEDE/555555/${brand.name}`,
  followers: brand.followers
}));

interface FashionGridProps {
  searchQuery?: string;
  onSelectBrand: (brand: any) => void;
  onResetSearch?: () => void;
}

const FashionGrid = ({ searchQuery = "", onSelectBrand, onResetSearch }: FashionGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [likedBrands, setLikedBrands] = useState<string[]>(
    JSON.parse(localStorage.getItem('likedBrands') || '[]')
  );
  const [brandLogos, setBrandLogos] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadLocalLogos = () => {
      const logos: Record<string, string> = {};
      
      for (const item of fashionItems) {
        const username = item.title.replace('@', '');
        try {
          logos[item.title] = `/src/profile_pics /${username}.jpg`;
        } catch (error) {
        }
      }
      
      setBrandLogos(logos);
    };
    
    loadLocalLogos();
  }, []);
  
  const filteredItems = fashionItems
    .filter(item => {
      return selectedCategory ? item.genre.toUpperCase() === selectedCategory.toUpperCase() : true;
    })
    .filter(item => {
      return searchQuery ? item.title.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    });

  const toggleLike = (brandTitle: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    const updatedLikes = likedBrands.includes(brandTitle)
      ? likedBrands.filter(name => name !== brandTitle)
      : [...likedBrands, brandTitle];
    
    setLikedBrands(updatedLikes);
    localStorage.setItem('likedBrands', JSON.stringify(updatedLikes));
    
    if (!likedBrands.includes(brandTitle)) {
    }
  };

  return (
    <div className="p-1 flex-1 overflow-auto">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        {searchQuery && (
          <div className="mb-2 w-full flex justify-center">
            <Button 
              onClick={onResetSearch}
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <RefreshCw size={14} />
              <span>Reset Search</span>
            </Button>
          </div>
        )}
        
        <div className="mb-2 w-full">
          <MarqueeCategories onSelectCategory={setSelectedCategory} />
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 p-2 w-full overflow-y-auto max-h-[calc(100vh-220px)]">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              className="aspect-[3/5] md:aspect-[3/5] bg-gray-50 rounded-md overflow-hidden hover:bg-gray-100 transition-colors flex flex-col cursor-pointer shadow-sm"
            >
              <div className="p-2 border-b flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2 bg-gray-200 flex items-center justify-center">
                    <img 
                      src={`/src/profile_pics /${item.title.replace('@', '')}.jpg`} 
                      alt={item.title} 
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                      }}
                    />
                    <Instagram size={14} className="text-gray-500 fallback-icon hidden" />
                  </div>
                  <div className="text-sm font-medium">@{item.title.replace('@', '')}</div>
                </div>
                
                <button 
                  onClick={(e) => toggleLike(item.title, e)}
                  className="p-1 rounded-full hover:bg-gray-200"
                  aria-label={likedBrands.includes(item.title) ? "Unlike" : "Like"}
                >
                  <Heart 
                    size={16} 
                    className={likedBrands.includes(item.title) ? "fill-red-500 text-red-500" : "text-gray-500"}
                  />
                </button>
              </div>
              
              <div className="flex-1 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-12 h-12 bg-white z-10"></div>
              </div>
              
              <div className="px-2 py-2 flex justify-center w-full">
                <div className="flex flex-wrap gap-2 justify-center">
                  {item.genre.split('/').map((genre, idx) => (
                    <span 
                      key={idx}
                      className={`px-2 py-1 rounded-full text-xs font-bold ${genreColors[genre.trim()]?.bg || "bg-gray-500"} ${genreColors[genre.trim()]?.text || "text-white"}`}
                    >
                      {genre.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FashionGrid;
