
import { Search } from "lucide-react";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { brands } from "@/data/brands";
import { Command, CommandInput, CommandList, CommandGroup, CommandItem } from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  // Handle command selection
  const handleSelect = (brandName: string) => {
    setSelectedBrand(brandName.replace('@', ''));
  };

  const filteredBrands = brands.filter(brand => 
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col ml-14 md:ml-48 transition-all duration-300">
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
              {searchQuery.length > 0 && filteredBrands.length > 0 && (
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
            <div className="rounded-xl overflow-hidden shadow-lg bg-white w-full aspect-square max-w-3xl mx-auto">
              <iframe 
                src={`https://www.instagram.com/${selectedBrand}/embed`}
                className="w-full h-full border-none" 
                title={`${selectedBrand} Instagram Feed`}
                allowTransparency={true}
                scrolling="no"
              />
            </div>
          </div>
        ) : (
          <div className="px-8 pb-8">
            <div className="grid grid-cols-12 gap-3 max-w-6xl mx-auto">
              {/* Fashion collage with different sized elements */}
              <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow col-span-12 md:col-span-6 aspect-[3/2]">
                <img 
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                  alt="Fashion runway" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow col-span-12 md:col-span-6 aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                  alt="Fashion model" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow col-span-6 md:col-span-4 aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                  alt="Street style fashion" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow col-span-6 md:col-span-4 aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                  alt="Fashion shopping" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow col-span-12 md:col-span-4 aspect-[3/4]">
                <img 
                  src="https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                  alt="Fashion details" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="text-center my-12">
              <h1 className="text-3xl font-bold">FASHION:WEEK</h1>
              <p className="text-gray-600 mt-2">Your gateway to curated fashion brands.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
