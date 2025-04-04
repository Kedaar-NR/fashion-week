
import { useState } from "react";
import { X } from "lucide-react";

interface BrandProps {
  name: string;
  followers: string;
  genre?: string;
}

const Brand = ({ name, followers, genre }: BrandProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const instagramUsername = name.replace('@', '');

  const handleClick = () => {
    setIsOpen(true);
  };

  // Define genre colors
  const getGenreColor = () => {
    switch (genre?.toLowerCase()) {
      case 'streetwear':
      case 'street':
        return 'bg-blue-500';
      case 'punk':
      case 'goth':
      case 'grunge':
      case 'punk/goth/grunge':
        return 'bg-purple-600';
      case 'vintage':
      case 'cowboy':
      case 'vintage/cowboy':
        return 'bg-amber-600';
      case 'basic':
      case 'essentials':
      case 'basic/essentials':
        return 'bg-gray-500';
      case 'outlier':
        return 'bg-green-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <>
      <div 
        className="aspect-square bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100"
        onClick={handleClick}
      >
        <div className="flex flex-col h-full">
          <div className="px-3 py-2 flex items-center justify-between">
            <div className="text-sm font-medium truncate">{name}</div>
            {genre && (
              <div className={`text-xs px-2 py-0.5 rounded-full text-white ${getGenreColor()}`}>
                {genre}
              </div>
            )}
          </div>
          <div className="flex-1 bg-gray-50 flex items-center justify-center overflow-hidden">
            {/* Preview iframe */}
            <div className="w-full h-full opacity-70 hover:opacity-90 transition-opacity">
              <div className="w-full h-full flex items-center justify-center text-center bg-gray-200">
                <span className="text-xs text-gray-500 px-2">{name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto animate-slide-in-right">
            <div className="flex justify-between items-center p-4 border-b">
              <div>
                <h2 className="font-bold">{name}</h2>
                <p className="text-sm text-gray-500">{followers} followers</p>
                {genre && (
                  <div className={`inline-block text-xs px-2 py-0.5 rounded-full text-white mt-1 ${getGenreColor()}`}>
                    {genre}
                  </div>
                )}
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <p className="text-gray-600 mb-4">
                Latest posts from {name}
              </p>
              <div className="w-full aspect-square rounded-lg overflow-hidden">
                <iframe 
                  src={`https://www.instagram.com/${instagramUsername}/embed`}
                  className="w-full h-full border-none" 
                  title={`${name} Instagram Feed`}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Brand;
