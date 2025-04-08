
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

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
      className="h-screen w-screen flex flex-col items-center justify-center bg-white"
    >
      <h1 className="text-6xl md:text-8xl font-bold text-black text-center mb-12 tracking-tight">
        WELCOME TO<br />FASHION:WEEK
      </h1>
      <Button 
        onClick={handleBegin}
        className="text-xl px-10 py-6 h-auto bg-black text-white hover:bg-gray-800 rounded-none transition-all duration-300"
      >
        begin
      </Button>
    </motion.div>
  );
};

export default LandingPage;
