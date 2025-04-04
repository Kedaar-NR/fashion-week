
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { useNavigate } from "react-router-dom";
import { brands } from "@/data/brands";
import { Command, CommandInput, CommandList, CommandGroup, CommandItem } from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Handle command selection
  const handleSelect = (brandName: string) => {
    setOpen(false);
    // Navigate to the brand page with the selected brand
    navigate(`/brands?brand=${encodeURIComponent(brandName)}`);
  };

  const filteredBrands = brands.filter(brand => 
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content */}
      <div className="flex-1 ml-[240px] flex flex-col transition-all duration-300">
        {/* Search bar */}
        <div className="px-8 pt-6 pb-4">
          <div className="relative w-full max-w-3xl">
            <Command className="rounded-lg border shadow-md">
              <CommandInput
                placeholder="SEARCH BRANDS"
                value={searchQuery}
                onValueChange={setSearchQuery}
                className="h-12"
              />
              {searchQuery.length > 0 && (
                <CommandList>
                  <CommandGroup heading="Brands">
                    <ScrollArea className="h-64">
                      {filteredBrands.map((brand) => (
                        <CommandItem
                          key={brand.name}
                          onSelect={() => handleSelect(brand.name)}
                          className="cursor-pointer"
                        >
                          {brand.name}
                        </CommandItem>
                      ))}
                    </ScrollArea>
                  </CommandGroup>
                </CommandList>
              )}
            </Command>
          </div>
        </div>
        
        {/* Image collage */}
        <div className="px-8 flex-1">
          <div className="grid grid-cols-2 gap-4 max-w-5xl mx-auto">
            <div className="bg-pink-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src="/lovable-uploads/5dd82e63-58d4-418f-8e34-04396f0fcb62.png" 
                alt="Work on yourself" 
                className="w-full h-72 object-cover"
              />
            </div>
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src="/lovable-uploads/6013111d-a744-42c2-b128-011569deddfb.png" 
                alt="Person with laptop" 
                className="w-full h-72 object-cover"
              />
            </div>
            <div className="bg-purple-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src="/lovable-uploads/c2bd1148-642a-4a7d-9260-13f2a29dda20.png" 
                alt="Person with text" 
                className="w-full h-72 object-cover"
              />
            </div>
            <div className="bg-pink-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src="/lovable-uploads/33313685-1825-452f-9e0b-e8e4f7c0693e.png" 
                alt="Gospel" 
                className="w-full h-72 object-cover"
              />
            </div>
          </div>
          <div className="text-center my-8">
            <h1 className="text-3xl font-bold">FASHION:WEEK</h1>
            <p className="text-gray-600 mt-2">Your gateway to curated fashion brands.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
