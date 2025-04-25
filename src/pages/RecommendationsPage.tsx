
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { brands } from '@/data/brands';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import BrandContentCollage from '@/components/BrandContentCollage';
import MarqueeCategories from '@/components/MarqueeCategories';
import { ThreeDPhotoCarousel } from '@/components/ThreeDPhotoCarousel';
import Sidebar from '@/components/Sidebar';

const RecommendationsPage = () => {
  const [recommendedBrands, setRecommendedBrands] = useState<typeof brands>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      // Get three random brands for recommendations
      const randomBrands = getRandomBrands(3);
      setRecommendedBrands(randomBrands);
      
      // Save the recommended brands to localStorage
      localStorage.setItem('recommendedBrands', JSON.stringify(randomBrands.map(b => b.name)));
      
      // Auto-save recommended brands to liked brands
      const existingLikedBrands = JSON.parse(localStorage.getItem('likedBrands') || '[]');
      const brandNames = randomBrands.map(brand => brand.name);
      const newLikedBrands = [...new Set([...existingLikedBrands, ...brandNames])];
      localStorage.setItem('likedBrands', JSON.stringify(newLikedBrands));
    } catch (error) {
      console.error("Error setting up recommendations:", error);
    }
  }, []);

  const handleFinish = () => {
    localStorage.setItem('hasCompletedQuiz', 'true');
    toast.success('Your brand recommendations have been saved to your liked brands!');
    navigate('/home');
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    // You could add additional logic here to filter brands by category if needed
  };

  return (
    <div className="min-h-screen flex bg-white">
      <Sidebar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-grow p-4 ml-14"
      >
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-black text-center my-8">CURATED FOR YOU</h1>
          
          <MarqueeCategories onSelectCategory={handleCategorySelect} />
          <div className="mb-8">
            <ThreeDPhotoCarousel />
          </div>
          <BrandContentCollage />
          
          <div className="flex justify-center mt-6 mb-8">
            <Button 
              onClick={handleFinish}
              className="text-lg px-8 py-4 h-auto bg-black text-white hover:bg-gray-800 rounded-none"
            >
              Next
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Function to get random brands
const getRandomBrands = (count: number) => {
  const shuffled = [...brands].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default RecommendationsPage;
