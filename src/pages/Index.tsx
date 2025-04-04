
import { Search } from "lucide-react";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { brands } from "@/data/brands";
import { Command, CommandInput, CommandList, CommandGroup, CommandItem } from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

  // Array of streetwear images focusing on youth fashion
  const streetwearImages = [
    {
      src: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "Young man in streetwear outfit with hoodie"
    },
    {
      src: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "Urban skateboarder in casual streetwear"
    },
    {
      src: "https://images.unsplash.com/photo-1618386230888-8e9575023029?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "Colorful streetwear fashion"
    },
    {
      src: "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "Sneakers and urban style"
    },
    {
      src: "https://images.unsplash.com/photo-1509551388413-e18d5f5d2a2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "Vibrant youth fashion in urban setting"
    },
    {
      src: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "Trendy streetwear with bright colors"
    }
  ];
  
  // Brand colors for avatar backgrounds
  const brandColors = [
    'from-purple-500 to-blue-500',
    'from-pink-500 to-orange-400',
    'from-green-400 to-blue-500',
    'from-yellow-400 to-orange-500',
    'from-pink-400 to-red-500',
    'from-indigo-500 to-purple-500'
  ];

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col ml-14 md:ml-48 transition-all duration-300">
        {/* Header at the top */}
        <div className="text-center my-8 animate-fade-in">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">FASHION:WEEK</h1>
          <p className="text-gray-600 mt-2 bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent">Your gateway to curated fashion brands.</p>
        </div>
        
        {/* Search bar */}
        <div className="px-8 animate-scale-in">
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
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">{selectedBrand}</h2>
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
            <div className="max-w-6xl mx-auto">
              <Carousel 
                opts={{
                  align: "center",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {streetwearImages.map((image, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-1">
                        <div className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover-scale">
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full aspect-square object-cover"
                            loading="eager"
                          />
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center mt-4">
                  <CarouselPrevious className="mx-2 relative static translate-y-0 left-0" />
                  <CarouselNext className="mx-2 relative static translate-y-0 right-0" />
                </div>
              </Carousel>
              
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-6 animate-fade-in">
                {streetwearImages.map((image, index) => (
                  <div 
                    key={`grid-${index}`}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className="w-full aspect-square object-cover"
                      loading="eager"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
