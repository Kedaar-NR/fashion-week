
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { brands } from '@/data/brands';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

// Function to get random brands
const getRandomBrands = (count: number) => {
  const shuffled = [...brands].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

interface StyleTag {
  name: string;
  color: string;
  textColor: string;
}

const RecommendationsPage = () => {
  const [recommendedBrands, setRecommendedBrands] = useState<typeof brands>([]);
  const navigate = useNavigate();

  // Tags with their corresponding colors - updated with vibrant colors and text colors
  const styleTags: Record<string, StyleTag> = {
    'punk': { name: 'PUNK', color: 'bg-pink-500', textColor: 'text-white' },
    'street': { name: 'STREETWEAR', color: 'bg-red-500', textColor: 'text-white' },
    'basic': { name: 'BASIC', color: 'bg-blue-500', textColor: 'text-white' },
    'luxury': { name: 'LUXURY', color: 'bg-yellow-500', textColor: 'text-black' },
    'y2k': { name: 'Y2K', color: 'bg-purple-500', textColor: 'text-white' },
    'essentials': { name: 'ESSENTIALS', color: 'bg-green-500', textColor: 'text-white' },
    'vintage': { name: 'VINTAGE', color: 'bg-orange-500', textColor: 'text-white' },
    'minimalist': { name: 'MINIMALIST', color: 'bg-gray-500', textColor: 'text-white' },
    'gorpcore': { name: 'GORPCORE', color: 'bg-emerald-500', textColor: 'text-white' },
    'grunge': { name: 'GRUNGE', color: 'bg-purple-600', textColor: 'text-white' },
    'cowboy': { name: 'COWBOY', color: 'bg-amber-500', textColor: 'text-white' },
  };

  // Get style tags for each brand based on their genre
  const getBrandTags = (brand: (typeof brands)[0]) => {
    if (!brand.genre) return [];
    
    const genreLower = brand.genre.toLowerCase();
    const tags: StyleTag[] = [];
    
    if (styleTags[genreLower]) {
      tags.push(styleTags[genreLower]);
    } else {
      // Fallback to random tags if genre not found
      const allTags = Object.values(styleTags);
      tags.push(allTags[Math.floor(Math.random() * allTags.length)]);
    }
    
    return tags;
  };

  useEffect(() => {
    // Get three random brands for recommendations
    const randomBrands = getRandomBrands(3);
    setRecommendedBrands(randomBrands);
    
    // Save the recommended brands to localStorage
    localStorage.setItem('recommendedBrands', JSON.stringify(randomBrands.map(b => b.name)));
    
    // Auto-save recommended brands to liked brands
    const existingLikedBrands = JSON.parse(localStorage.getItem('likedBrands') || '[]');
    const brandNames = randomBrands.map(brand => brand.name);
    
    // Add only brands that aren't already in likedBrands
    const newLikedBrands = [...new Set([...existingLikedBrands, ...brandNames])];
    localStorage.setItem('likedBrands', JSON.stringify(newLikedBrands));
  }, []);

  const handleFinish = () => {
    // Save that the user has completed the quiz
    localStorage.setItem('hasCompletedQuiz', 'true');
    toast.success('Your brand recommendations have been saved to your liked brands!');
    navigate('/home');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col bg-white"
    >
      <div className="flex-grow p-4">
        <h1 className="text-5xl md:text-7xl font-bold text-black text-center my-12">CURATED FOR YOU:</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {recommendedBrands.map((brand, index) => {
            const cleanName = brand.name.replace('@', '');
            return (
              <motion.div 
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col"
              >
                <div className="bg-gray-100 rounded-2xl p-4 mb-4 overflow-hidden">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden mr-3 bg-gray-300 flex items-center justify-center">
                      <span className="font-bold text-white text-xl">{brand.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold">@{cleanName}</h2>
                      <div className="flex flex-wrap gap-2 mt-1 justify-center">
                        {getBrandTags(brand).map((tag, i) => (
                          <span 
                            key={i} 
                            className={`px-3 py-1 rounded-full ${tag.color} ${tag.textColor} text-sm font-medium`}
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-2xl overflow-hidden h-96">
                    <div className="aspect-square w-full h-80">
                      <iframe 
                        src={`https://www.instagram.com/${cleanName}/embed`}
                        className="w-full h-full border-none" 
                        title={`${brand.name} Instagram Feed`}
                        scrolling="no"
                        onError={(e) => {
                          // If iframe fails to load, replace with fallback image
                          const iframe = e.currentTarget;
                          iframe.style.display = 'none';
                          const img = document.createElement('img');
                          img.src = `https://placeholder.pics/svg/300x300/DEDEDE/555555/${brand.name}`;
                          img.className = 'w-full h-full object-cover rounded-xl';
                          iframe.parentNode?.appendChild(img);
                        }}
                      ></iframe>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
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
    </motion.div>
  );
};

export default RecommendationsPage;
