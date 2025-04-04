
import { Search } from "lucide-react";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import CategoryBar from "@/components/CategoryBar";
import FashionGrid from "@/components/FashionGrid";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="px-8 py-6 flex justify-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter">
            FASHION:WEEK
          </h1>
        </header>
        
        {/* Search bar */}
        <div className="px-8 flex justify-center mb-4">
          <div className="relative w-full max-w-3xl">
            <input
              type="text"
              placeholder="SEARCH"
              value={searchQuery}
              onChange={handleSearch}
              className="w-full py-3 pl-12 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
        
        {/* Category filters */}
        <CategoryBar />
        
        {/* Content grid */}
        <FashionGrid />
      </div>
    </div>
  );
};

export default Index;
