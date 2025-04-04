
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { brands } from "@/data/brands";
import { Command, CommandInput, CommandList, CommandGroup, CommandItem } from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Carousel } from "@/components/ui/carousel";
import { LampTitle } from "@/components/ui/LampTitle";

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

  // Fashion carousel slides - fashion and clothes focused
  const fashionSlides = [
    {
      title: "Modern Fashion",
      button: "Explore Collection",
      src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Urban Streetwear",
      button: "View Style",
      src: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Designer Pieces",
      button: "Browse Designs",
      src: "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Casual Elegance",
      button: "Shop Now",
      src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
  ];
  
  // Brand colors for avatar backgrounds
  const brandColors = [
    'from-purple-500 to-blue-500',
    'from-pink-500 to-orange-400',
    'from-green-400 to-blue-500',
    'from-yellow-400 to-orange-500',
    'from-pink-400 to-red-500',
    'from-indigo-500 to-purple-500',
    'from-blue-400 to-emerald-400',
    'from-amber-400 to-orange-600',
    'from-rose-400 to-red-600',
    'from-violet-400 to-indigo-600',
  ];

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col ml-14 md:ml-48 transition-all duration-300">
        {/* Header with Lamp effect */}
        <LampTitle />
        
        {/* Search bar */}
        <div className="px-8 animate-scale-in">
          <div className="relative w-full max-w-3xl mx-auto">
            <Command className="rounded-lg border shadow-md">
              <CommandInput
                placeholder="Search brands"
                value={searchQuery}
                onValueChange={setSearchQuery}
                className="h-12"
              />
              {searchQuery.length > 0 && filteredBrands.length > 0 && (
                <CommandList>
                  <CommandGroup heading="Brands">
                    <ScrollArea className="h-64">
                      {filteredBrands.map((brand, index) => (
                        <CommandItem
                          key={brand.name}
                          onSelect={() => handleSelect(brand.name)}
                          className="cursor-pointer flex items-center space-x-2 hover:bg-gray-100 transition-colors"
                        >
                          <Avatar className={`h-8 w-8 bg-gradient-to-br ${brandColors[index % brandColors.length]}`}>
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
          <div className="px-8 pb-8 mt-6 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 gradient-text gradient-primary">{selectedBrand}</h2>
            <div className="rounded-xl overflow-hidden shadow-lg bg-white w-full aspect-square max-w-3xl mx-auto hover:shadow-xl transition-shadow">
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
            <div className="max-w-3xl mx-auto">
              <div className="mb-8">
                <div className="relative overflow-hidden w-full py-6">
                  <Carousel slides={fashionSlides} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
