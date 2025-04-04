
import { useState } from "react";
import { X } from "lucide-react";

interface BrandProps {
  name: string;
  followers: string;
}

const Brand = ({ name, followers }: BrandProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div 
        className="aspect-square bg-gray-50 rounded-md hover:bg-gray-100 transition-colors flex flex-col items-center justify-center cursor-pointer p-4"
        onClick={handleClick}
      >
        <div className="text-base font-medium mb-2">{name}</div>
        <div className="w-full h-48 bg-gray-200 rounded-md"></div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <div>
                <h2 className="font-bold">{name}</h2>
                <p className="text-sm text-gray-500">{followers} followers</p>
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
              <div className="aspect-square bg-gray-100 rounded-md mb-4"></div>
              <div className="aspect-square bg-gray-100 rounded-md"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Brand;
