
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { brands } from "@/data/brands";
import { Search } from "lucide-react";
import { useLocation } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

// Categories for brands
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

const BrandsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const location = useLocation();

  // Get query params for preselecting a brand
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const brandParam = searchParams.get("brand");
    if (brandParam) {
      setSelectedBrand(brandParam);
    }
  }, [location]);
  
  const handleCategoryClick = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  const filteredBrands = brands.filter(brand => 
    brand.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (!activeCategory || (activeCategory === "SELECTION BASED"))
  );

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 ml-[240px] flex flex-col p-8">
        <h1 className="text-3xl font-bold mb-6">Brands</h1>
        
        {/* Category filters */}
        <div className="w-full overflow-x-auto scrollbar-none py-4 mb-8">
          <ScrollArea className="w-full" orientation="horizontal">
            <div className="flex min-w-max space-x-4">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 whitespace-nowrap rounded-full transition-colors text-sm font-medium ${
                    activeCategory === category 
                      ? "bg-purple-600 text-white" 
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
        
        {/* Search bar */}
        <div className="mb-8">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search brands"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 pl-12 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
        
        {/* Brands grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBrands.map((brand) => (
            <div 
              key={brand.name}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
              onClick={() => setSelectedBrand(brand.name)}
            >
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400">Instagram Post</span>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-800">{brand.name}</h3>
              </div>
            </div>
          ))}
        </div>
        
        {/* Brand sidebar */}
        {selectedBrand && (
          <div className="fixed top-0 right-0 w-80 h-full bg-white border-l border-gray-200 shadow-lg p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out z-20">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setSelectedBrand(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="pt-6">
              <h2 className="text-2xl font-bold mb-2">{selectedBrand}</h2>
              
              {brands.find(brand => brand.name === selectedBrand) && (
                <p className="text-sm text-gray-500 mb-4">
                  {brands.find(brand => brand.name === selectedBrand)?.followers} followers
                </p>
              )}
              
              <div className="h-80 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-400">Instagram Feed Embed</span>
              </div>
              
              <p className="text-gray-600">
                Check out the latest designs and collections from {selectedBrand}.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandsPage;
