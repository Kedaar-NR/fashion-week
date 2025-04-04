
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { brands } from "@/data/brands";
import { toast } from "sonner";
import { Heart } from "lucide-react";

const LikedPage = () => {
  const [likedBrands, setLikedBrands] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const navigate = useNavigate();

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
  
  const handleBrandClick = (brandName: string) => {
    setSelectedBrand(brandName);
  };

  const closeInstagramView = () => {
    setSelectedBrand(null);
  };

  // Sample brand descriptions
  const brandBlurbs: Record<string, string> = {
    "jeanpaulknott": "Jean-Paul Knott delivers timeless elegance with minimalist designs that focus on exceptional tailoring and luxurious fabrics.",
    "isseymiyake": "Issey Miyake blends technology with tradition, creating innovative pleating techniques and architectural silhouettes that redefine modern fashion.",
    "acnestudios": "Acne Studios combines Scandinavian minimalism with distinctive design elements, offering contemporary pieces with artistic sensibilities.",
    "maisonmargiela": "Maison Margiela's avant-garde approach deconstructs and reimagines fashion conventions, creating conceptual designs with intellectual depth.",
    "commedesgarcons": "Comme des Garçons challenges fashion norms with bold, architectural designs that blend art and fashion in unexpected ways.",
    "rafsimons": "Raf Simons merges youth culture references with precise tailoring, creating collections that are both culturally relevant and impeccably crafted.",
    "balenciaga": "Balenciaga delivers architectural silhouettes and street-inspired designs that define contemporary fashion through bold innovation.",
    "vetements": "Vetements subverts fashion expectations with oversized proportions and street influences, creating statement pieces with cultural commentary.",
    "rickowens": "Rick Owens crafts dark, architectural designs with a distinctive gothic aesthetic that balances brutalist forms with fluid draping.",
  };

  // Get a random blurb for brands without a specific one
  const getBlurb = (brandName: string) => {
    const normalizedName = brandName.toLowerCase().replace(/[^a-z0-9]/g, "");
    return brandBlurbs[normalizedName] || 
      "This cutting-edge brand combines innovative design with quality craftsmanship, offering distinctive pieces that reflect contemporary fashion sensibilities.";
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
        
        {isLoggedIn && filteredBrands.length > 0 && !selectedBrand && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredBrands.map((brand) => (
              <div 
                key={brand.name}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow p-4 flex flex-col items-center cursor-pointer"
                onClick={() => handleBrandClick(brand.name)}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold mb-2 bg-gradient-to-br from-${brand.name.charCodeAt(0) % 2 ? 'pink-500 to-orange-400' : 'purple-500 to-blue-500'}`}>
                  {brand.name.charAt(0).toUpperCase()}
                </div>
                <h3 className="font-semibold text-gray-800">{brand.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{brand.genre}</p>
                <p className="text-xs text-gray-400 mt-2">{brand.followers}</p>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUnlike(brand.name);
                  }}
                  className="mt-3 p-1.5 hover:bg-gray-100 rounded-full"
                >
                  <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        )}
        
        {selectedBrand && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center ml-14 md:ml-48">
            <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{selectedBrand}</h2>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleUnlike(selectedBrand)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <Heart className="h-5 w-5 fill-red-500 text-red-500" /> 
                  </button>
                  <button 
                    onClick={closeInstagramView}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    ✕
                  </button>
                </div>
              </div>
              
              <p className="mb-4 text-gray-600 italic border-l-4 border-gray-300 pl-3 py-2 bg-gray-50">
                {getBlurb(selectedBrand)}
              </p>
              
              <div className="rounded-xl overflow-hidden aspect-square w-full h-[70vh]">
                <iframe 
                  src={`https://www.instagram.com/${selectedBrand}/embed`}
                  className="w-full h-full border-none" 
                  title={`${selectedBrand} Instagram Feed`}
                  allowTransparency={true}
                  scrolling="no"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LikedPage;
