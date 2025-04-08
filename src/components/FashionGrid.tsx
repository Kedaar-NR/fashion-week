
import { useState } from "react";
import { motion } from "framer-motion";
import MarqueeCategories from "./MarqueeCategories";

// Create more detailed fashion items with brand information
const fashionItems = [
  { 
    id: 1, 
    title: "kine.jkt", 
    genre: "streetwear",
    image: "https://placeholder.pics/svg/300x300/DEDEDE/555555/Shirt",
    description: "Emerging Indonesian streetwear label known for their minimalist aesthetic and sustainable practices."
  },
  { 
    id: 2, 
    title: "concrete_orchids", 
    genre: "luxury",
    image: "https://placeholder.pics/svg/300x300/DEDEDE/555555/Shirt",
    description: "A high-end boutique label creating avant-garde pieces inspired by architectural forms and natural elements."
  },
  { 
    id: 3, 
    title: "shortsarchive", 
    genre: "vintage",
    image: "https://placeholder.pics/svg/300x300/DEDEDE/555555/Shirt",
    description: "Curated vintage collection specializing in rare and unique shorts from the 80s and 90s."
  },
  { 
    id: 4, 
    title: "twopockets", 
    genre: "essentials",
    image: "https://placeholder.pics/svg/300x300/DEDEDE/555555/Shirt",
    description: "Functional everyday basics with a focus on quality materials and thoughtful pocket design."
  },
  { 
    id: 5, 
    title: "nihil.ny", 
    genre: "punk",
    image: "https://placeholder.pics/svg/300x300/DEDEDE/555555/Shirt",
    description: "New York-based punk-inspired label featuring distressed details and bold graphic prints."
  },
  { 
    id: 6, 
    title: "babyev2k", 
    genre: "y2k",
    image: "https://placeholder.pics/svg/300x300/DEDEDE/555555/Shirt",
    description: "Y2K aesthetic reimagined with a modern twist, offering nostalgic vibes with futuristic elements."
  },
  { 
    id: 7, 
    title: "friedrice_nyc", 
    genre: "streetwear",
    image: "https://placeholder.pics/svg/300x300/DEDEDE/555555/Shirt",
    description: "NYC street culture meets Asian influences in this playful and authentic streetwear brand."
  },
  { 
    id: 8, 
    title: "profitminded.clo", 
    genre: "minimalist",
    image: "https://placeholder.pics/svg/300x300/DEDEDE/555555/Shirt",
    description: "Business-inspired casual wear with clean lines and premium fabrics for the modern entrepreneur."
  },
  { 
    id: 9, 
    title: "chxmicalover", 
    genre: "grunge",
    image: "https://placeholder.pics/svg/300x300/DEDEDE/555555/Shirt",
    description: "Experimental grunge aesthetics with a chemical-inspired color palette and distressed textiles."
  },
];

interface BrandPopupProps {
  brand: typeof fashionItems[0];
  onClose: () => void;
}

const BrandPopup = ({ brand, onClose }: BrandPopupProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-full max-w-3xl max-h-[90vh] overflow-auto relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
        >
          ✕
        </button>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 aspect-square rounded-2xl overflow-hidden bg-gray-100">
            <iframe 
              src={`https://www.instagram.com/${brand.title}/embed`}
              className="w-full h-full border-none" 
              title={`${brand.title} Instagram Feed`}
              scrolling="no"
              allowTransparency={true}
              onError={(e) => {
                // If iframe fails to load, replace with fallback image
                e.currentTarget.style.display = 'none';
                const img = document.createElement('img');
                img.src = brand.image;
                img.className = 'w-full h-full object-cover';
                e.currentTarget.parentNode?.appendChild(img);
              }}
            />
          </div>
          
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">@{brand.title}</h2>
            
            <div className="mb-6">
              <span className={`px-3 py-1 rounded-full ${getGenreColor(brand.genre)}`}>
                {brand.genre.toUpperCase()}
              </span>
            </div>
            
            <p className="text-gray-700 mb-6">{brand.description}</p>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">About this brand</h3>
              <p className="text-gray-600">
                {getBrandDescription(brand.title)}
              </p>
            </div>
            
            <button className="mt-8 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition">
              Follow on Instagram
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Function to get detailed brand description
const getBrandDescription = (brandName: string) => {
  // Create unique descriptions based on brand name
  const descriptions = {
    "kine.jkt": "KINE.JKT crafts minimalist streetwear with Indonesian influences, focusing on sustainable production and ethical sourcing. Their signature oversized silhouettes and muted color palette have garnered a dedicated following in Southeast Asia.",
    "concrete_orchids": "Blending brutalist architecture with delicate floral motifs, Concrete Orchids creates luxury pieces that challenge conventional fashion norms. Each garment is meticulously crafted with premium materials and innovative construction techniques.",
    "shortsarchive": "A nostalgic journey through decades of short styles, Shorts Archive preserves and reimagines vintage designs for the modern wardrobe. Their curated collections feature rare finds and thoughtfully restored pieces.",
    "twopockets": "Function meets form in TwoPockets' essential garments, where practical storage solutions become design features. Their commitment to quality basics has earned them a reputation for reliability and thoughtful design.",
    "nihil.ny": "Raw energy and counterculture spirit define NIHIL.NY's punk-inspired collections. Drawing from New York's underground scene, their pieces feature distressed elements, bold graphics, and anti-establishment messaging.",
    "babyev2k": "BabyEV2K captures millennial nostalgia with their Y2K-inspired pieces, featuring metallic fabrics, playful graphics, and tech-inspired details that bridge past and future aesthetics.",
    "friedrice_nyc": "A celebration of Asian-American culture through the lens of NYC street style, FriedRice blends cultural references with urban sensibilities in their vibrant and authentic collections.",
    "profitminded.clo": "Elevating everyday business casual, ProfitMinded creates minimal, sophisticated pieces for ambitious professionals who value quality and understated elegance.",
    "chxmicalover": "Exploring the intersection of grunge aesthetics and chemical processes, ChxmicalOver creates experimental pieces featuring unique dye techniques, distressed textiles, and unconventional silhouettes."
  };
  
  return descriptions[brandName as keyof typeof descriptions] || 
    `${brandName} is an innovative fashion brand pushing boundaries with their unique aesthetic and commitment to quality. Their distinctive approach to design has garnered them a dedicated following in the fashion community.`;
};

// Function to get color class based on genre
const getGenreColor = (genre: string) => {
  const genreColors: Record<string, string> = {
    'punk': 'bg-pink-500 text-white',
    'streetwear': 'bg-red-500 text-white',
    'basic': 'bg-blue-500 text-white',
    'luxury': 'bg-yellow-500 text-black',
    'y2k': 'bg-purple-500 text-white',
    'essentials': 'bg-green-500 text-white',
    'vintage': 'bg-orange-500 text-white',
    'minimalist': 'bg-gray-500 text-white',
    'gorpcore': 'bg-emerald-500 text-white',
    'grunge': 'bg-purple-600 text-white',
    'cowboy': 'bg-amber-500 text-white',
  };
  
  return genreColors[genre.toLowerCase()] || 'bg-blue-500 text-white';
};

const FashionGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<typeof fashionItems[0] | null>(null);
  
  // Filter items based on selected category
  const filteredItems = selectedCategory
    ? fashionItems.filter(item => item.genre.toLowerCase() === selectedCategory.toLowerCase())
    : fashionItems;

  return (
    <div className="p-4 md:p-8 flex-1">
      <MarqueeCategories onSelectCategory={setSelectedCategory} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={() => setSelectedBrand(item)}
            className="aspect-square bg-gray-50 rounded-xl overflow-hidden hover:bg-gray-100 transition-colors flex flex-col cursor-pointer shadow-sm"
          >
            <div className="p-4 border-b flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-gray-200 flex items-center justify-center">
                <span className="font-bold text-gray-500">{item.title.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <div className="font-medium">@{item.title}</div>
                <div className="text-xs text-gray-500 capitalize">{item.genre}</div>
              </div>
            </div>
            
            <div className="flex-1 overflow-hidden">
              <iframe 
                src={`https://www.instagram.com/${item.title}/embed`}
                className="w-full h-full border-none" 
                title={`${item.title} Instagram Feed`}
                scrolling="no"
                allowTransparency={true}
                onError={(e) => {
                  // If iframe fails to load, replace with fallback image
                  e.currentTarget.style.display = 'none';
                  const img = document.createElement('img');
                  img.src = item.image;
                  img.className = 'w-full h-full object-cover';
                  e.currentTarget.parentNode?.appendChild(img);
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
      
      {selectedBrand && (
        <BrandPopup brand={selectedBrand} onClose={() => setSelectedBrand(null)} />
      )}
    </div>
  );
};

export default FashionGrid;
