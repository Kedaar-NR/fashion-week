
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Brand from "@/components/Brand";
import { brands } from "@/data/brands";
import { Search } from "lucide-react";

const BrandsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredBrands = brands.filter(brand => 
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 ml-[240px] flex flex-col p-8">
        <h1 className="text-3xl font-bold mb-6">Brands</h1>
        
        {/* Search bar */}
        <div className="mb-8">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search brands"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 pl-12 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
        
        {/* Brands grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBrands.map((brand) => (
            <Brand 
              key={brand.name}
              name={brand.name}
              followers={brand.followers}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandsPage;
