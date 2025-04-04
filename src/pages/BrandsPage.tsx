
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { brands, genreColors } from "@/data/brands";
import { Search } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Brand from "@/components/Brand";
import { toast } from "sonner";

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

  // Get query params for preselecting a brand or filter by style
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const brandParam = searchParams.get("brand");
    const styleParam = searchParams.get("style");
    
    if (brandParam) {
      setSelectedBrand(brandParam);
    }
    
    if (styleParam && categories.includes(styleParam)) {
      setActiveCategory(styleParam);
      toast.success(`Showing ${styleParam.toLowerCase()} brands based on your style`);
    }
  }, [location]);
  
  const handleCategoryChange = (value: string) => {
    setActiveCategory(value);
  };

  const filteredBrands = brands.filter(brand => 
    brand.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (activeCategory === "ALL" || brand.genre === activeCategory)
  );

  const handleBrandClick = (brandName: string) => {
    setSelectedBrand(brandName);
  };

  const closeInstagramView = () => {
    setSelectedBrand(null);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 ml-14 md:ml-48 pt-8 px-4 md:px-8">
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
          
          {selectedBrand ? (
            <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center ml-14 md:ml-48">
              <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">{selectedBrand}</h2>
                  <button 
                    onClick={closeInstagramView}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    ✕
                  </button>
                </div>
                <div className="rounded-xl overflow-hidden aspect-square w-full h-[70vh]">
                  <iframe 
                    src={`https://www.instagram.com/${selectedBrand}/embed`}
                    className="w-full h-full border-none" 
                    title={`${selectedBrand} Instagram Feed`}
                    allowTransparency={true}
                    scrolling="no"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredBrands.map((brand) => (
                <Brand
                  key={brand.name}
                  name={brand.name}
                  followers={brand.followers}
                  genre={brand.genre}
                  onClick={() => handleBrandClick(brand.name)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandsPage;
