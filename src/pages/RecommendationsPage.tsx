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

  const handleNextClick = () => {
    // Save recommended brands to localStorage
    localStorage.setItem('recommendedBrands', JSON.stringify(recommendedBrands));
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

  // Get tags for each brand based on index
  const getBrandTags = (index: number) => {
    if (index === 0) {
      return [
        { name: "punk", bgColor: "bg-pink-100", textColor: "text-pink-800" },
        { name: "street", bgColor: "bg-red-100", textColor: "text-red-800" }
      ];
    } else if (index === 1) {
      return [
        { name: "basic", bgColor: "bg-blue-100", textColor: "text-blue-800" },
        { name: "luxury", bgColor: "bg-yellow-100", textColor: "text-yellow-800" }
      ];
    } else {
      return [
        { name: "y2k", bgColor: "bg-green-100", textColor: "text-green-800" }
      ];
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-grow">
        <div className="flex min-h-screen">
          <Sidebar />
          
          <div className="flex-1 flex flex-col ml-14 md:ml-48 transition-all duration-300 p-6">
            <h1 className="text-5xl font-black text-center mb-8">CURATED FOR YOU:</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {recommendedBrands.map((brandName, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
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
                  
                  <div className="grid grid-cols-2 gap-0.5">
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
                      className="text-blue-500 hover:underline text-sm flex justify-center items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      View full profile on Instagram
                    </a>
                  </div>
                  
                  <div className="px-4 pb-4">
                    <div className="flex flex-wrap gap-2">
                      {getBrandTags(index).map((tag, i) => (
                        <span key={i} className={`px-3 py-1 ${tag.bgColor} ${tag.textColor} rounded-full text-xs`}>
                          {tag.name}
                        </span>
                      ))}
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
