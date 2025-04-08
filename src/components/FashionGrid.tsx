
import { useState } from "react";
import { motion } from "framer-motion";
import { brands, genreColors } from "@/data/brands";
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

const FashionGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<typeof fashionItems[0] | null>(null);
  
  const filteredItems = selectedCategory
    ? fashionItems.filter(item => item.genre.toUpperCase() === selectedCategory.toUpperCase())
    : fashionItems;

  return (
    <div className="p-1 flex-1 overflow-hidden">
      <MarqueeCategories onSelectCategory={setSelectedCategory} />
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1 overflow-hidden max-h-[calc(100vh-200px)]">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={() => setSelectedBrand(item)}
            className="aspect-[3/4] bg-gray-50 rounded-md overflow-hidden hover:bg-gray-100 transition-colors flex flex-col cursor-pointer shadow-sm"
          >
            <div className="p-1 border-b flex items-center">
              <div className="w-4 h-4 rounded-full overflow-hidden mr-0.5 bg-gray-200 flex items-center justify-center">
                <span className="font-bold text-gray-500 text-[8px]">{item.title.charAt(0).toUpperCase()}</span>
              </div>
              <div className="overflow-hidden">
                <div className="font-medium text-[8px] truncate">@{item.title.replace('@', '')}</div>
                <div className="text-[6px] mt-0.5">
                  <span className={`px-1 py-0.5 rounded-full text-[6px] ${genreColors[item.genre]?.bg || "bg-gray-500"} ${genreColors[item.genre]?.text || "text-white"}`}>
                    {item.genre}
                  </span>
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
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FashionGrid;
