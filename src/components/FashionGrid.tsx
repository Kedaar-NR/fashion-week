
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { brands, genreColors } from "@/data/brands";
import { Heart, Instagram, RefreshCw, Shirt } from "lucide-react";
import MarqueeCategories from "./MarqueeCategories";
import { Button } from "./ui/button";

// Get brand website URL if available
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

// Create fashion items from our brands data
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
  
  // Check if brand has Instagram account
  useEffect(() => {
    // Try to fetch Instagram profile pics for brands
    const fetchBrandLogos = async () => {
      const logos: Record<string, string> = {};
      
      for (const item of fashionItems) {
        try {
          const username = item.title.replace('@', '');
          const response = await fetch(`https://www.instagram.com/${username}/?__a=1&__d=dis`);
          
          if (response.ok) {
            const data = await response.json();
            const profilePic = data.graphql?.user?.profile_pic_url;
            if (profilePic) {
              logos[item.title] = profilePic;
            }
          }
        } catch (error) {
          // Silently fail - we'll use default icon
        }
      }
      
      setBrandLogos(logos);
    };
    
    fetchBrandLogos();
  }, []);
  
  // Filter items by category and search query if provided
  const filteredItems = fashionItems
    .filter(item => {
      // First filter by category if selected
      return selectedCategory ? item.genre.toUpperCase() === selectedCategory.toUpperCase() : true;
    })
    .filter(item => {
      // Then filter by search query if provided
      return searchQuery ? item.title.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    });

  // Toggle like status for a brand
  const toggleLike = (brandTitle: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering parent click
    
    const updatedLikes = likedBrands.includes(brandTitle)
      ? likedBrands.filter(name => name !== brandTitle)
      : [...likedBrands, brandTitle];
    
    setLikedBrands(updatedLikes);
    localStorage.setItem('likedBrands', JSON.stringify(updatedLikes));
    
    if (!likedBrands.includes(brandTitle)) {
      // Toast notification is handled in the parent component
    }
  };

  return (
    <div className="p-1 flex-1 overflow-hidden flex flex-col items-center">
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
        
        <MarqueeCategories onSelectCategory={setSelectedCategory} />
        
        {/* Modified grid layout - 2 columns for mobile, higher aspect ratio */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 overflow-y-auto max-h-[calc(100vh-200px)] p-2 w-full">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              onClick={() => onSelectBrand(item)}
              className="aspect-[3/5] md:aspect-[3/5] bg-gray-50 rounded-md overflow-hidden hover:bg-gray-100 transition-colors flex flex-col cursor-pointer shadow-sm"
            >
              <div className="p-2 border-b flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2 bg-gray-200 flex items-center justify-center">
                    {brandLogos[item.title] ? (
                      <img 
                        src={brandLogos[item.title]} 
                        alt={item.title} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Instagram size={14} className="text-gray-500" />
                    )}
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
              
              <div className="flex-1 overflow-hidden rounded-b-md relative">
                <iframe 
                  src={`https://www.instagram.com/${item.title.replace('@', '')}/embed`}
                  className="w-full h-full border-none" 
                  title={`${item.title} Instagram Feed`}
                  scrolling="no"
                  loading="lazy"
                  onError={(e) => {
                    const iframe = e.currentTarget;
                    iframe.style.display = 'none';
                    
                    const container = document.createElement('div');
                    container.className = 'w-full h-full flex items-center justify-center bg-gray-100';
                    
                    const iconContainer = document.createElement('div');
                    iconContainer.className = 'text-gray-400 flex items-center justify-center h-full';
                    iconContainer.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shirt"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg>';
                    container.appendChild(iconContainer);
                    
                    const websiteUrl = getBrandWebsiteUrl(item.title);
                    if (websiteUrl) {
                      const linkContainer = document.createElement('div');
                      linkContainer.className = 'absolute bottom-0 left-0 right-0 bg-black/70 p-0.5 text-white text-center text-[6px]';
                      
                      const link = document.createElement('a');
                      link.href = websiteUrl;
                      link.target = '_blank';
                      link.rel = 'noopener noreferrer';
                      link.className = 'text-white hover:underline text-[6px]';
                      link.textContent = 'Visit Website';
                      
                      linkContainer.appendChild(link);
                      container.appendChild(linkContainer);
                    }
                    
                    iframe.parentNode?.appendChild(container);
                  }}
                />
              </div>
              
              <div className="px-1 py-0.5 flex justify-center">
                <div className="flex flex-wrap gap-1 justify-center">
                  {item.genre.split('/').map((genre, idx) => (
                    <span 
                      key={idx}
                      className={`px-1 py-0.5 rounded-full text-[10px] ${genreColors[item.genre]?.bg || "bg-gray-500"} ${genreColors[item.genre]?.text || "text-white"}`}
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
