
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { brands, genreColors } from "@/data/brands";
import { Search } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Categories for brands
const categories = [
  "ALL",
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
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
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
  
  const handleCategoryChange = (value: string) => {
    setActiveCategory(value);
  };

  const filteredBrands = brands.filter(brand => 
    brand.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (activeCategory === "ALL" || brand.genre === activeCategory)
  );

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 pt-24 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Brands</h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-8">
            {/* Category dropdown */}
            <div className="w-64">
              <Select value={activeCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Search bar */}
            <div className="flex-grow max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search brands"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-400"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          </div>
          
          {/* Brands grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredBrands.map((brand) => {
              const genreStyle = brand.genre && genreColors[brand.genre] ? 
                genreColors[brand.genre] : 
                { bg: "bg-gray-100", text: "text-gray-700" };
              
              return (
                <div 
                  key={brand.name}
                  className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
                  onClick={() => setSelectedBrand(brand.name)}
                >
                  <div className={`h-32 ${genreStyle.bg} flex items-center justify-center`}>
                    <span className="text-xs text-gray-500">Instagram Post</span>
                  </div>
                  <div className="p-3">
                    <h3 className="text-xs font-medium text-gray-800 mb-1 truncate">{brand.name}</h3>
                    {brand.genre && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${genreStyle.bg} ${genreStyle.text}`}>
                        {brand.genre}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Brand detail sidebar */}
        {selectedBrand && (
          <div className="fixed top-0 right-0 w-96 h-full bg-white border-l border-gray-200 shadow-lg p-6 overflow-y-auto z-20">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setSelectedBrand(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="pt-8">
              <h2 className="text-2xl font-bold mb-2">{selectedBrand}</h2>
              
              {brands.find(brand => brand.name === selectedBrand) && (
                <>
                  <p className="text-sm text-gray-500 mb-1">
                    {brands.find(brand => brand.name === selectedBrand)?.followers} followers
                  </p>
                  
                  {brands.find(brand => brand.name === selectedBrand)?.genre && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      genreColors[brands.find(brand => brand.name === selectedBrand)?.genre || ""]?.bg || "bg-gray-100"
                    } ${
                      genreColors[brands.find(brand => brand.name === selectedBrand)?.genre || ""]?.text || "text-gray-700"
                    } inline-block mb-4`}>
                      {brands.find(brand => brand.name === selectedBrand)?.genre}
                    </span>
                  )}
                </>
              )}
              
              <p className="text-gray-600 my-4">
                {selectedBrand} is a contemporary fashion brand known for its unique aesthetic and cultural influence. 
                Their designs blend modern sensibilities with artistic expression.
              </p>
              
              <div className="space-y-4">
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">Instagram Feed</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <div className="aspect-square bg-gray-100 rounded-md"></div>
                  <div className="aspect-square bg-gray-100 rounded-md"></div>
                  <div className="aspect-square bg-gray-100 rounded-md"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandsPage;
