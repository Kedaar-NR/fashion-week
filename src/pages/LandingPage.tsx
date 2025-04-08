
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { TextShimmerWave } from '@/components/ui/text-shimmer-wave';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleBegin = () => {
    navigate('/quiz');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="h-screen w-screen flex flex-col items-center justify-center bg-white relative"
    >
      <div className="text-center absolute transform translate-x-[-5%]">
        <h1 className="text-6xl md:text-8xl font-bold text-black text-center mb-12 tracking-tight">
          <TextShimmerWave
            className="[--base-color:#000000] [--base-gradient-color:#333333]"
            duration={2}
            spread={1.2}
            zDistance={20}
            scaleDistance={1.1}
          >
            WELCOME TO
          </TextShimmerWave>
          <br />
          <TextShimmerWave
            className="font-extrabold [--base-color:#000000] [--base-gradient-color:#333333]"
            duration={2}
            spread={1.2}
            zDistance={20}
            scaleDistance={1.1}
          >
            FASHION:WEEK
          </TextShimmerWave>
        </h1>
        <Button 
          onClick={handleBegin}
          className="text-xl px-10 py-6 h-auto bg-black text-white hover:bg-gray-800 rounded-none transition-all duration-300 font-bold"
        >
          BEGIN
        </Button>
      </div>
    </motion.div>
  );
};

export default LandingPage;
