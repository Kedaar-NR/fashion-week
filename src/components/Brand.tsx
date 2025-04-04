
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { toast } from "sonner";

interface BrandProps {
  name: string;
  followers: string;
  genre: string;
}

const Brand = ({ name, followers, genre }: BrandProps) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  
  // Check if brand is in liked brands from localStorage
  useEffect(() => {
    const likedBrands = JSON.parse(localStorage.getItem('likedBrands') || '[]');
    setIsLiked(likedBrands.includes(name));
  }, [name]);

  const handleClick = () => {
    navigate(`/brands?brand=${name}`);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the parent's onClick
    
    const likedBrands = JSON.parse(localStorage.getItem('likedBrands') || '[]');
    
    if (isLiked) {
      // Remove from liked
      const updatedLikedBrands = likedBrands.filter((brand: string) => brand !== name);
      localStorage.setItem('likedBrands', JSON.stringify(updatedLikedBrands));
      setIsLiked(false);
      toast.success(`Removed ${name} from liked brands`);
    } else {
      // Add to liked
      likedBrands.push(name);
      localStorage.setItem('likedBrands', JSON.stringify(likedBrands));
      setIsLiked(true);
      toast.success(`Added ${name} to liked brands`);
    }
  };

  // Get first letter for avatar
  const firstLetter = name.charAt(0).toUpperCase();
  
  // Get random light background color based on name
  const getBackgroundColor = () => {
    const colors = [
      'bg-gradient-to-br from-purple-500 to-blue-500',
      'bg-gradient-to-br from-pink-500 to-orange-400',
      'bg-gradient-to-br from-green-400 to-blue-500',
      'bg-gradient-to-br from-yellow-400 to-orange-500',
      'bg-gradient-to-br from-pink-400 to-red-500',
      'bg-gradient-to-br from-indigo-500 to-purple-500',
      'bg-gradient-to-br from-blue-400 to-emerald-400',
      'bg-gradient-to-br from-amber-400 to-orange-600',
    ];
    
    // Use the brand name to generate a consistent color
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div 
      onClick={handleClick}
      className="relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer p-4 flex flex-col items-center"
    >
      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold mb-2 ${getBackgroundColor()}`}>
        {firstLetter}
      </div>
      <h3 className="font-semibold text-gray-800">{name}</h3>
      <p className="text-xs text-gray-500 mt-1">{genre}</p>
      <p className="text-xs text-gray-400 mt-2">{followers}</p>
      
      <button 
        onClick={handleLike} 
        className="absolute top-2 right-2 p-1.5 hover:bg-gray-100 rounded-full"
        aria-label={isLiked ? "Unlike" : "Like"}
      >
        <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
      </button>
    </div>
  );
};

export default Brand;
