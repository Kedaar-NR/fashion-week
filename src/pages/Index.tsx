
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
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const navigate = useNavigate();

  // Handle command selection
  const handleSelect = (brandName: string) => {
    setOpen(false);
    setSelectedBrand(brandName.replace('@', ''));
    // Note: Not navigating away, instead showing embedded Instagram
  };

  const filteredBrands = brands.filter(brand => 
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col ml-16 md:ml-56 transition-all duration-300">
        {/* Search bar */}
        <div className="px-8 py-6">
          <div className="relative w-full max-w-3xl mx-auto">
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
        
        {selectedBrand ? (
          <div className="px-8 pb-8">
            <h2 className="text-2xl font-bold mb-4">{selectedBrand}</h2>
            <div className="rounded-xl overflow-hidden shadow-lg bg-white w-full aspect-square">
              <iframe 
                src={`https://www.instagram.com/${selectedBrand}/embed`}
                className="w-full h-full border-none" 
                title={`${selectedBrand} Instagram Feed`}
                allowTransparency
                scrolling="no"
              />
            </div>
          </div>
        ) : (
          <div className="px-8 grid grid-cols-12 gap-4 max-w-6xl mx-auto">
            <div className="bg-purple-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow md:col-span-7 aspect-square">
              <img 
                src="/lovable-uploads/5dd82e63-58d4-418f-8e34-04396f0fcb62.png" 
                alt="Work on yourself" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow md:col-span-5 md:row-span-2 aspect-auto">
              <img 
                src="/lovable-uploads/6013111d-a744-42c2-b128-011569deddfb.png" 
                alt="Person with laptop" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-purple-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow md:col-span-4 aspect-square">
              <img 
                src="/lovable-uploads/c2bd1148-642a-4a7d-9260-13f2a29dda20.png" 
                alt="Person with text" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-pink-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow md:col-span-3 aspect-square">
              <img 
                src="/lovable-uploads/33313685-1825-452f-9e0b-e8e4f7c0693e.png" 
                alt="Gospel" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
        
        <div className="text-center my-12">
          <h1 className="text-3xl font-bold">FASHION:WEEK</h1>
          <p className="text-gray-600 mt-2">Your gateway to curated fashion brands.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
