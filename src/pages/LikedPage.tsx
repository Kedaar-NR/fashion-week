
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { brands } from "@/data/brands";
import { toast } from "sonner";
import { Heart } from "lucide-react";

const LikedPage = () => {
  const [likedBrands, setLikedBrands] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);

    if (user) {
      // Only get liked brands if user is logged in
      const savedLikedBrands = JSON.parse(localStorage.getItem('likedBrands') || '[]');
      setLikedBrands(savedLikedBrands);
    } else {
      // Clear liked brands if not logged in
      setLikedBrands([]);
    }
  }, []);

  // Filter brands to only show liked ones
  const filteredBrands = brands.filter(brand => 
    likedBrands.includes(brand.name)
  );

  const handleUnlike = (brandName: string) => {
    const updatedLikedBrands = likedBrands.filter(name => name !== brandName);
    localStorage.setItem('likedBrands', JSON.stringify(updatedLikedBrands));
    setLikedBrands(updatedLikedBrands);
    toast.success(`Removed ${brandName} from liked brands`);
  };

  return (
    <div className="flex min-h-screen bg-white font-kanit">
      <Sidebar />
      <div className="flex-1 ml-14 md:ml-48 p-8">
        <h1 className="text-3xl font-bold mb-6">Liked Brands</h1>
        
        {!isLoggedIn && (
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-100 text-center">
            <h2 className="text-xl font-semibold mb-2">Sign in to view your liked brands</h2>
            <p className="text-gray-500 mb-4">Create an account to save and organize your favorite brands</p>
            <a 
              href="/signin"
              className="inline-flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Sign In
            </a>
          </div>
        )}
        
        {isLoggedIn && filteredBrands.length === 0 && (
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-100 text-center">
            <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No liked brands yet</h2>
            <p className="text-gray-500 mb-4">Start browsing and save your favorite brands</p>
            <a 
              href="/brands"
              className="inline-flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Browse Brands
            </a>
          </div>
        )}
        
        {isLoggedIn && filteredBrands.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredBrands.map((brand) => (
              <div 
                key={brand.name}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow p-4 flex flex-col items-center"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold mb-2 bg-gradient-to-br from-${brand.name.charCodeAt(0) % 2 ? 'pink-500 to-orange-400' : 'purple-500 to-blue-500'}`}>
                  {brand.name.charAt(0).toUpperCase()}
                </div>
                <h3 className="font-semibold text-gray-800">{brand.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{brand.genre}</p>
                <p className="text-xs text-gray-400 mt-2">{brand.followers}</p>
                
                <button 
                  onClick={() => handleUnlike(brand.name)}
                  className="mt-3 p-1.5 hover:bg-gray-100 rounded-full"
                >
                  <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LikedPage;
