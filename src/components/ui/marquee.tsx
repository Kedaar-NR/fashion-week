import React from 'react';

interface MarqueeProps {
  items: string[];
  speed?: number;
  activeItem?: string;
  onItemClick?: (item: string) => void;
}

export const Marquee: React.FC<MarqueeProps> = ({ 
  items, 
  speed = 30, 
  activeItem,
  onItemClick
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  // Generate a color for each category
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "ALL": "bg-gray-200 text-gray-800",
      "STREETWEAR": "bg-red-100 text-red-800",
      "PUNK": "bg-purple-100 text-purple-800",
      "ESSENTIALS": "bg-blue-100 text-blue-800",
      "LUXURY": "bg-yellow-100 text-yellow-800",
      "MINIMALIST": "bg-gray-100 text-gray-800",
      "GORPCORE": "bg-green-100 text-green-800",
      "Y2K": "bg-green-100 text-green-800",
      "VINTAGE": "bg-amber-100 text-amber-800",
      "BASIC": "bg-blue-100 text-blue-800",
      "GRUNGE": "bg-slate-100 text-slate-800",
      "COWBOY": "bg-orange-100 text-orange-800"
    };
    
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="w-full overflow-hidden mb-6">
      <div className="relative">
        <div 
          ref={containerRef}
          className="flex whitespace-nowrap animate-marquee"
          style={{ 
            animationDuration: `${items.length * speed}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite'
          }}
        >
          {/* First copy of items */}
          {items.map((item, index) => (
            <div 
              key={`item-1-${index}`}
              onClick={() => onItemClick && onItemClick(item)}
              className={`inline-block mx-2 px-4 py-2 rounded-full cursor-pointer transition-all duration-200 ${
                activeItem === item 
                  ? `${getCategoryColor(item)} font-bold ring-2 ring-offset-2 ring-gray-300` 
                  : `${getCategoryColor(item)} hover:scale-105`
              }`}
            >
              {item.toLowerCase()}
            </div>
          ))}
          
          {/* Duplicate items to ensure continuous scrolling */}
          {items.map((item, index) => (
            <div 
              key={`item-2-${index}`}
              onClick={() => onItemClick && onItemClick(item)}
              className={`inline-block mx-2 px-4 py-2 rounded-full cursor-pointer transition-all duration-200 ${
                activeItem === item 
                  ? `${getCategoryColor(item)} font-bold ring-2 ring-offset-2 ring-gray-300` 
                  : `${getCategoryColor(item)} hover:scale-105`
              }`}
            >
              {item.toLowerCase()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
