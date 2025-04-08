import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { brands } from "@/data/brands";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { toast } from "sonner";

const RecommendationsPage = () => {
  const [recommendedBrands, setRecommendedBrands] = useState<string[]>([]);
  const [likedBrands, setLikedBrands] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load liked brands from localStorage
    const saved = JSON.parse(localStorage.getItem('likedBrands') || '[]');
    setLikedBrands(saved);

    // Get quiz results from localStorage
    const quizResults = JSON.parse(localStorage.getItem('quizResults') || '{}');
    const selectedStyles = quizResults.selectedStyles || [];
    
    // Get brands that match the selected styles
    const matchingBrands = brands.filter(brand => 
      selectedStyles.includes(brand.genre)
    );
    
    // If we have matching brands, select 3 random ones
    // Otherwise, just select 3 random brands from the entire list
    let brandsToRecommend: string[] = [];
    
    if (matchingBrands.length >= 3) {
      // Shuffle matching brands and take 3
      const shuffled = [...matchingBrands].sort(() => 0.5 - Math.random());
      brandsToRecommend = shuffled.slice(0, 3).map(brand => brand.name);
    } else {
      // Shuffle all brands and take 3
      const shuffled = [...brands].sort(() => 0.5 - Math.random());
      brandsToRecommend = shuffled.slice(0, 3).map(brand => brand.name);
    }
    
    setRecommendedBrands(brandsToRecommend);
  }, []);

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

  // Get a detailed blurb for a brand, fallback to generated description
  const getBlurb = (brandName: string) => {
    const normalizedName = brandName.toLowerCase().replace(/[^a-z0-9]/g, "");
    return brandBlurbs[normalizedName] || 
      "This cutting-edge brand combines innovative design with quality craftsmanship, offering distinctive pieces that reflect contemporary fashion sensibilities.";
  };

  const handleNextClick = () => {
    navigate('/home');
  };

  const toggleLikeBrand = (e: React.MouseEvent, brandName: string) => {
    e.stopPropagation();
    
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      toast.error("Please sign in to save brands");
      setTimeout(() => {
        navigate('/signin');
      }, 1500);
      return;
    }
    
    const isLiked = likedBrands.includes(brandName);
    let updatedLikedBrands;
    
    if (isLiked) {
      // Remove from liked
      updatedLikedBrands = likedBrands.filter(name => name !== brandName);
      toast.success(`Removed ${brandName} from liked brands`);
    } else {
      // Add to liked
      updatedLikedBrands = [...likedBrands, brandName];
      toast.success(`Added ${brandName} to liked brands`);
    }
    
    setLikedBrands(updatedLikedBrands);
    localStorage.setItem('likedBrands', JSON.stringify(updatedLikedBrands));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-grow">
        <div className="flex min-h-screen">
          <Sidebar />
          
          <div className="flex-1 flex flex-col ml-14 md:ml-48 transition-all duration-300 p-6">
            <h1 className="text-4xl font-bold text-center mb-6">CURATED FOR YOU:</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {recommendedBrands.map((brandName, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-4 flex justify-between items-center border-b">
                    <h2 className="text-xl font-semibold">@{brandName}</h2>
                    <button 
                      onClick={(e) => toggleLikeBrand(e, brandName)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <Heart 
                        className={`h-5 w-5 ${likedBrands.includes(brandName) ? 'fill-red-500 text-red-500' : ''}`} 
                      />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-500 to-gray-800 flex items-center justify-center text-white font-bold mr-2">
                        {brandName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold">{brandName}</div>
                        <div className="text-sm text-gray-500">16.2K followers</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mb-2">106 posts</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-1">
                    <img src={`/images/images1/IMG_495${index + 3}.JPG`} alt="Brand post" className="w-full aspect-square object-cover" />
                    <img src={`/images/images1/IMG_495${index + 5}.JPG`} alt="Brand post" className="w-full aspect-square object-cover" />
                    <img src={`/images/images2/IMG_497${index + 1}.JPG`} alt="Brand post" className="w-full aspect-square object-cover" />
                    <img src={`/images/images2/IMG_497${index + 3}.JPG`} alt="Brand post" className="w-full aspect-square object-cover" />
                  </div>
                  
                  <div className="p-4 text-center">
                    <a 
                      href={`https://www.instagram.com/${brandName}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline text-sm"
                    >
                      View full profile on Instagram
                    </a>
                  </div>
                  
                  <div className="px-4 pb-4">
                    <div className="flex flex-wrap gap-2">
                      {index === 0 && (
                        <>
                          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">punk</span>
                          <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs">street</span>
                        </>
                      )}
                      {index === 1 && (
                        <>
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">basic</span>
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">luxury</span>
                        </>
                      )}
                      {index === 2 && (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">y2k</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button 
                onClick={handleNextClick}
                className="px-8 py-2 text-lg"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPage;
