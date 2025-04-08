import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { brands } from "@/data/brands";
import { Shirt } from "lucide-react";

// Function to get detailed brand descriptions
const getBrandDescription = (brandName: string) => {
  const descriptions: Record<string, string> = {
    "kine.jkt": "KINE.JKT crafts minimalist streetwear with Indonesian influences, focusing on sustainable production and ethical sourcing. Their signature oversized silhouettes and muted color palette have garnered a dedicated following in Southeast Asia.",
    "concrete_orchids": "Blending brutalist architecture with delicate floral motifs, Concrete Orchids creates luxury pieces that challenge conventional fashion norms. Each garment is meticulously crafted with premium materials and innovative construction techniques.",
    "shortsarchive": "A nostalgic journey through decades of short styles, Shorts Archive preserves and reimagines vintage designs for the modern wardrobe. Their curated collections feature rare finds and thoughtfully restored pieces.",
    "twopockets": "Function meets form in TwoPockets' essential garments, where practical storage solutions become design features. Their commitment to quality basics has earned them a reputation for reliability and thoughtful design.",
    "nihil.ny": "Raw energy and counterculture spirit define NIHIL.NY's punk-inspired collections. Drawing from New York's underground scene, their pieces feature distressed elements, bold graphics, and anti-establishment messaging.",
    "babyev2k": "BabyEV2K captures millennial nostalgia with their Y2K-inspired pieces, featuring metallic fabrics, playful graphics, and tech-inspired details that bridge past and future aesthetics.",
    "friedrice_nyc": "A celebration of Asian-American culture through the lens of NYC street style, FriedRice blends cultural references with urban sensibilities in their vibrant and authentic collections.",
    "profitminded.clo": "Elevating everyday business casual, ProfitMinded creates minimal, sophisticated pieces for ambitious professionals who value quality and understated elegance.",
    "chxmicalover": "Exploring the intersection of grunge aesthetics and chemical processes, ChxmicalOver creates experimental pieces featuring unique dye techniques, distressed textiles, and unconventional silhouettes.",
    "gumisdum": "A fashion label challenging conventions with its distorted silhouettes and asymmetrical cuts. Founded by a collective of artists, each piece tells a story of rebellion and artistic expression.",
    "hwasan": "Taking inspiration from traditional Asian garments, Hwasan offers a modern twist on heritage silhouettes using sustainable fabrics and artisanal techniques passed down through generations.",
    "loadingtofuture": "A tech-inspired brand blending futuristic elements with everyday streetwear. Their innovative textiles and forward-thinking details create garments that feel ahead of their time.",
    "excess.us": "Maximalist fashion celebrating abundance and opulence with bold prints, intricate embellishments, and layered textures that reject minimalist trends in favor of more-is-more aesthetics.",
    "vadis.shop": "Contemporary women's wear focusing on fluid silhouettes and innovative draping techniques. Their garments transform simple fabrics into sculptural pieces that move elegantly with the body.",
    "blan.nyc": "A New York City brand defined by their monochromatic palette and architectural influences. Their pieces feature clean lines and precise tailoring with subtle, thoughtful details.",
    "toofar.us": "Experimental streetwear pushing boundaries with deconstructed garments, unexpected proportions, and provocative graphics that challenge fashion conventions.",
    "bevyi.us": "Luxury leisurewear blending comfort with elevation through premium fabrics and refined details, creating versatile pieces for the modern, multifaceted lifestyle.",
    "aiona.us": "Sustainable fashion with a focus on zero-waste pattern cutting and naturally dyed fabrics. Each collection tells a story of environmental consciousness and timeless design.",
    "lowkey.industries": "Understated luxury that speaks in whispers rather than shouts, focusing on impeccable craftsmanship, quality materials, and subtle branding for the discerning customer.",
    "sketsaparis": "Parisian-influenced designs with a contemporary edge, blending French effortlessness with bold, artistic elements inspired by modern art movements.",
    "gospel.core": "Faith-inspired streetwear that merges spiritual imagery with contemporary designs, creating meaningful pieces that spark conversation and connection.",
    "somar.us": "Luxury activewear designed for movement and performance while maintaining a sophisticated aesthetic. Their technical fabrics and innovative cuts bridge the gap between function and fashion.",
    "joy_divizn": "A tribute to post-punk aesthetics with modern sensibilities, featuring dark palettes, utilitarian details, and graphic elements inspired by iconic album artwork.",
    "derschutze_clo": "Military-inspired garments reinterpreted through a luxury lens, with attention to authentic details, premium materials, and precise construction.",
    "vicinity.de": "Berlin-based label combining contemporary German design sensibility with urban attitude, featuring clean lines and avant-garde detailing.",
    "aliasonline.us": "Ultra-modern streetwear with a digital-forward aesthetic, merging virtual culture with tangible fashion that pushes creative boundaries.",
  };
  
  if (descriptions[brandName]) {
    return descriptions[brandName];
  }
  
  const adjectives = ["innovative", "cutting-edge", "boundary-pushing", "trend-setting", "authentic", "visionary", "distinctive", "creative", "bold", "unique"];
  const concepts = ["design philosophy", "aesthetic", "craftsmanship", "creativity", "cultural influences", "artistic vision", "technical expertise"];
  const outcomes = ["garments that tell a story", "pieces that stand the test of time", "collections that challenge conventions", "designs that blur the lines between art and fashion", "creations that resonate with today's culture"];
  
  const seed = brandName.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const randomAdjective = adjectives[seed % adjectives.length];
  const randomConcept = concepts[(seed * 3) % concepts.length];
  const randomOutcome = outcomes[(seed * 7) % outcomes.length];
  
  return `${brandName} represents ${randomAdjective} fashion through their unique ${randomConcept}, creating ${randomOutcome}. Their distinctive approach to design has garnered them a dedicated following in the fashion community.`;
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
    'selection based': 'bg-slate-500 text-white',
  };
  
  return genreColors[genre.toLowerCase()] || 'bg-blue-500 text-white';
};

// Function to get brand website URL if available
const getBrandWebsiteUrl = (brandName: string) => {
  const websiteUrls: Record<string, string> = {
    "aliasonline.us": "https://aliasonline.us",
    "vicinity.de": "https://vicinity.de",
    "gospel.core": "https://gospelcore.com",
  };
  
  return websiteUrls[brandName] || null;
};

// Create fashion items from our brands data
const fashionItems = brands.map((brand, index) => ({
  id: index + 1,
  title: brand.name,
  genre: brand.genre?.toLowerCase() || "streetwear",
  image: `https://placeholder.pics/svg/300x300/DEDEDE/555555/${brand.name}`,
  followers: brand.followers
}));

// Marquee categories
const categories = [
  "STREETWEAR",
  "PUNK",
  "ESSENTIALS",
  "LUXURY",
  "MINIMALIST",
  "GORPCORE", 
  "Y2K",
  "VINTAGE",
  "BASIC",
  "GRUNGE",
  "COWBOY",
  "SELECTION BASED"
];

interface BrandPopupProps {
  brand: typeof fashionItems[0];
  onClose: () => void;
}

const BrandPopup = ({ brand, onClose }: BrandPopupProps) => {
  const [instagramFailed, setInstagramFailed] = useState(false);
  const websiteUrl = getBrandWebsiteUrl(brand.title);
  const cleanBrandName = brand.title.replace('@', '');
  
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
              src={`https://www.instagram.com/${cleanBrandName}/embed`}
              className={`w-full h-full border-none ${instagramFailed ? 'hidden' : 'block'}`}
              title={`${brand.title} Instagram Feed`}
              scrolling="no"
              loading="lazy"
              onError={(e) => {
                setInstagramFailed(true);
              }}
            />
            {instagramFailed && (
              <div className="w-full h-full flex flex-col">
                <img 
                  src={`https://source.unsplash.com/300x300/?fashion,clothing,${brand.genre}`}
                  alt={brand.title}
                  className="w-full h-full object-cover rounded-2xl"
                />
                {websiteUrl && (
                  <div className="p-4 bg-black/80 text-white absolute bottom-0 left-0 right-0">
                    <a 
                      href={websiteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:underline"
                    >
                      Visit {cleanBrandName} Website
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">@{cleanBrandName}</h2>
            
            <div className="mb-6">
              <span className={`px-3 py-1 rounded-full ${getGenreColor(brand.genre)}`}>
                {brand.genre.toUpperCase()}
              </span>
            </div>
            
            <p className="text-gray-700 mb-6">{getBrandDescription(brand.title)}</p>
            
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

// Marquee component for categories with smaller width
const MarqueeCategories = ({ onSelectCategory }: { onSelectCategory: (category: string) => void }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [duplicatedCategories, setDuplicatedCategories] = useState<string[]>([]);
  
  useEffect(() => {
    setDuplicatedCategories([...categories, ...categories]);
  }, []);

  const handleCategoryClick = (category: string) => {
    const newActive = activeCategory === category ? null : category;
    setActiveCategory(newActive);
    onSelectCategory(newActive || "");
  };
  
  return (
    <div className="w-full overflow-hidden py-2 bg-gradient-to-r from-gray-50 to-white rounded-xl my-4">
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          repeat: Infinity, 
          duration: 20, 
          ease: "linear" 
        }}
      >
        {duplicatedCategories.map((category, idx) => (
          <button
            key={`${category}-${idx}`}
            className={`px-3 py-1.5 mx-1 whitespace-nowrap rounded-full transition-colors text-xs font-medium ${
              activeCategory === category 
                ? "bg-black text-white" 
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </motion.div>
    </div>
  );
};

const FashionGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<typeof fashionItems[0] | null>(null);
  
  const filteredItems = selectedCategory
    ? fashionItems.filter(item => item.genre.toLowerCase() === selectedCategory.toLowerCase())
    : fashionItems;

  return (
    <div className="p-2 md:p-4 flex-1">
      <MarqueeCategories onSelectCategory={setSelectedCategory} />
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={() => setSelectedBrand(item)}
            className="aspect-square bg-gray-50 rounded-lg overflow-hidden hover:bg-gray-100 transition-colors flex flex-col cursor-pointer shadow-sm"
          >
            <div className="p-2 border-b flex items-center">
              <div className="w-6 h-6 rounded-full overflow-hidden mr-2 bg-gray-200 flex items-center justify-center">
                <span className="font-bold text-gray-500 text-xs">{item.title.charAt(0).toUpperCase()}</span>
              </div>
              <div className="overflow-hidden">
                <div className="font-medium text-xs truncate">@{item.title.replace('@', '')}</div>
                <div className="text-xxs mt-0.5">
                  <span className={`px-1.5 py-0.5 rounded-full text-xxs ${getGenreColor(item.genre)}`}>
                    {item.genre.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-hidden rounded-b-lg relative">
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
                  iconContainer.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shirt"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg>';
                  container.appendChild(iconContainer);
                  
                  const websiteUrl = getBrandWebsiteUrl(item.title);
                  if (websiteUrl) {
                    const linkContainer = document.createElement('div');
                    linkContainer.className = 'absolute bottom-0 left-0 right-0 bg-black/70 p-1 text-white text-center text-xs';
                    
                    const link = document.createElement('a');
                    link.href = websiteUrl;
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                    link.className = 'text-white hover:underline text-xs';
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
      
      {selectedBrand && (
        <BrandPopup brand={selectedBrand} onClose={() => setSelectedBrand(null)} />
      )}
    </div>
  );
};

export default FashionGrid;
