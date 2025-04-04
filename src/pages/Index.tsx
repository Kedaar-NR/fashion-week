
import { Search } from "lucide-react";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { brands } from "@/data/brands";
import { Command, CommandInput, CommandList, CommandGroup, CommandItem } from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";

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
        {/* Header at the top */}
        <div className="text-center my-8">
          <h1 className="text-3xl font-bold tracking-tight">FASHION:WEEK</h1>
          <p className="text-gray-600 mt-2">Your gateway to curated fashion brands.</p>
        </div>
        
        {/* Search bar */}
        <div className="px-8">
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
                          className="cursor-pointer flex items-center space-x-2"
                        >
                          <Avatar className="h-8 w-8 bg-gradient-to-br from-orange-400 to-pink-600">
                            <div className="font-bold text-white">
                              {brand.name.charAt(0).toUpperCase()}
                            </div>
                          </Avatar>
                          <span>{brand.name}</span>
                          <span className="ml-auto text-xs text-gray-400">{brand.followers}</span>
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
          <div className="px-8 pb-8 mt-6">
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
          <div className="px-8 pb-8 mt-4">
            <div className="grid grid-cols-12 gap-3 max-w-6xl mx-auto">
              {/* Men's fashion collage with balanced, symmetrical layout */}
              <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow col-span-8 aspect-[16/9]">
                <img 
                  src="https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                  alt="Men's fashion model" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow col-span-4 aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                  alt="Men's casual fashion" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow col-span-4 aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                  alt="Men's streetwear" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow col-span-4 aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1520975867597-4ddbadfd2bae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                  alt="Men's formal fashion" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow col-span-4 aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                  alt="Men's casual style" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow col-span-6 aspect-[4/3]">
                <img 
                  src="https://images.unsplash.com/photo-1550246140-29f40b909e5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                  alt="Men's accessories" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow col-span-6 aspect-[4/3]">
                <img 
                  src="https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                  alt="Men's fashion details" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
