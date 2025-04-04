
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { brands, genreColors } from "@/data/brands";
import { Search } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Brand from "@/components/Brand";

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
          
          {/* Brands grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredBrands.map((brand) => (
              <Brand
                key={brand.name}
                name={brand.name}
                followers={brand.followers}
                genre={brand.genre}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandsPage;
