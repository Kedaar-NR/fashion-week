
import { useState } from "react";
import { motion } from "framer-motion";
import { brands, genreColors } from "@/data/brands";
import { Heart } from "lucide-react";
import MarqueeCategories from "./MarqueeCategories";

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
}

const FashionGrid = ({ searchQuery = "", onSelectBrand }: FashionGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [likedBrands, setLikedBrands] = useState<string[]>(
    JSON.parse(localStorage.getItem('likedBrands') || '[]')
  );
  
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
    <div className="p-1 flex-1 overflow-hidden">
      <MarqueeCategories onSelectCategory={setSelectedCategory} />
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 overflow-y-auto max-h-[calc(100vh-200px)] p-2">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            onClick={() => onSelectBrand(item)}
            className="aspect-[3/5] bg-gray-50 rounded-md overflow-hidden hover:bg-gray-100 transition-colors flex flex-col cursor-pointer shadow-sm"
          >
            <div className="p-4 border-b flex flex-col items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-3 bg-gray-200 flex items-center justify-center">
                <span className="font-bold text-gray-500 text-xl">{item.title.charAt(0).toUpperCase()}</span>
              </div>
              <div className="text-center">
                <div className="font-medium text-lg">@{item.title.replace('@', '')}</div>
                <div className="flex flex-wrap gap-1 mt-2 justify-center">
                  {item.genre.split('/').map((genre, idx) => (
                    <span 
                      key={idx}
                      className={`px-2 py-0.5 rounded-full text-xs ${genreColors[item.genre]?.bg || "bg-gray-500"} ${genreColors[item.genre]?.text || "text-white"}`}
                    >
                      {genre.trim()}
                    </span>
                  ))}
                </div>
              </div>
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
                  iconContainer.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shirt"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg>';
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
              <button 
                onClick={(e) => toggleLike(item.title, e)}
                className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full shadow-md hover:bg-white z-10"
              >
                <Heart 
                  size={18} 
                  className={likedBrands.includes(item.title) ? "fill-red-500 text-red-500" : "text-gray-500"}
                />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FashionGrid;

