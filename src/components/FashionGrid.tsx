
import { useState, useEffect } from "react";

interface FashionItem {
  id: number;
  imageUrl: string;
  size: "large" | "medium" | "small";
}

const FashionGrid = () => {
  const [fashionItems, setFashionItems] = useState<FashionItem[]>([]);
  
  useEffect(() => {
    // Simulate fetching fashion data
    const mockFashionItems: FashionItem[] = [
      { 
        id: 1, 
        imageUrl: "https://picsum.photos/seed/fashion1/800/900", 
        size: "large" 
      },
      { 
        id: 2, 
        imageUrl: "https://picsum.photos/seed/fashion2/400/400", 
        size: "medium" 
      },
      { 
        id: 3, 
        imageUrl: "https://picsum.photos/seed/fashion3/400/400", 
        size: "medium" 
      },
      { 
        id: 4, 
        imageUrl: "https://picsum.photos/seed/fashion4/400/300", 
        size: "small" 
      },
      { 
        id: 5, 
        imageUrl: "https://picsum.photos/seed/fashion5/400/300", 
        size: "small" 
      }
    ];
    
    setFashionItems(mockFashionItems);
  }, []);

  return (
    <div className="p-4 md:p-8 flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 auto-rows-auto">
        {fashionItems.map((item) => (
          <FashionCard key={item.id} item={item} />
        ))}
      </div>
      <div className="text-right mt-4 text-gray-500 pr-2">
        @shmule
      </div>
    </div>
  );
};

const FashionCard = ({ item }: { item: FashionItem }) => {
  const getGridClasses = () => {
    switch (item.size) {
      case "large":
        return "col-span-12 md:col-span-6 row-span-2";
      case "medium":
        return "col-span-12 md:col-span-6 lg:col-span-6";
      case "small":
        return "col-span-12 md:col-span-3 lg:col-span-3";
      default:
        return "col-span-12 md:col-span-6 lg:col-span-3";
    }
  };

  return (
    <div className={`${getGridClasses()} overflow-hidden rounded-md bg-gray-50 hover:opacity-90 transition-opacity`}>
      <div className="h-full w-full relative">
        <img 
          src={item.imageUrl} 
          alt="Fashion item" 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default FashionGrid;
