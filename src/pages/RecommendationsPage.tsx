
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { brands } from '@/data/brands';
import { toast } from 'sonner';

// Function to get random brands
const getRandomBrands = (count: number) => {
  const shuffled = [...brands].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

interface StyleTag {
  name: string;
  color: string;
}

const RecommendationsPage = () => {
  const [recommendedBrands, setRecommendedBrands] = useState<typeof brands>([]);
  const navigate = useNavigate();

  // Tags with their corresponding colors
  const styleTags: Record<string, StyleTag> = {
    'punk': { name: 'punk', color: 'bg-pink-200' },
    'street': { name: 'street', color: 'bg-red-200' },
    'basic': { name: 'basic', color: 'bg-blue-200' },
    'luxury': { name: 'luxury', color: 'bg-yellow-100' },
    'y2k': { name: 'y2k', color: 'bg-purple-200' },
  };

  // Get random style tags for each brand
  const getRandomTags = (brandIndex: number) => {
    const allTags = Object.values(styleTags);
    const numberOfTags = brandIndex === 0 ? 2 : brandIndex === 1 ? 2 : 1;
    
    let selectedTags: StyleTag[] = [];
    
    if (brandIndex === 0) {
      selectedTags = [styleTags.punk, styleTags.street];
    } else if (brandIndex === 1) {
      selectedTags = [styleTags.basic, styleTags.luxury];
    } else {
      selectedTags = [styleTags.y2k];
    }
    
    return selectedTags;
  };

  useEffect(() => {
    // Get three random brands for recommendations
    const randomBrands = getRandomBrands(3);
    setRecommendedBrands(randomBrands);
    
    // Save the recommended brands to localStorage
    localStorage.setItem('recommendedBrands', JSON.stringify(randomBrands.map(b => b.name)));
  }, []);

  const handleFinish = () => {
    // Save that the user has completed the quiz
    localStorage.setItem('hasCompletedQuiz', 'true');
    toast.success('Your brand recommendations have been saved!');
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-grow p-4">
        <h1 className="text-5xl md:text-7xl font-bold text-black text-center my-12">CURATED FOR YOU:</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {recommendedBrands.map((brand, index) => (
            <div key={index} className="flex flex-col">
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <h2 className="text-2xl font-semibold mb-4 text-center">@{brand.name}</h2>
                
                <div className="rounded-lg overflow-hidden">
                  <div className="flex items-center p-3 border-b">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-3 bg-gray-300 flex items-center justify-center">
                      <span className="font-bold text-white">{brand.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <div className="font-semibold">{brand.name}</div>
                      <div className="text-gray-500">16.2K followers</div>
                      <div className="text-gray-500">• 106 posts</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-1 aspect-square">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className="bg-gray-200 aspect-square"></div>
                    ))}
                  </div>
                  
                  <div className="p-3 bg-blue-500 text-white text-center">
                    View full profile on Instagram
                  </div>
                </div>
                
                <div className="flex flex-wrap mt-4 gap-2">
                  {getRandomTags(index).map((tag, i) => (
                    <span key={i} className={`px-4 py-1 rounded-full ${tag.color}`}>
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-8 mb-12">
          <Button 
            onClick={handleFinish}
            className="text-xl px-10 py-6 h-auto bg-black text-white hover:bg-gray-800 rounded-none"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPage;
