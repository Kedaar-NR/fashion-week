
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleBegin = () => {
    navigate('/quiz');
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-6xl md:text-8xl font-bold text-black text-center mb-12 tracking-tight">
        WELCOME TO<br />FASHION:WEEK
      </h1>
      <Button 
        onClick={handleBegin}
        className="text-xl px-10 py-6 h-auto bg-black text-white hover:bg-gray-800 rounded-none"
      >
        begin
      </Button>
    </div>
  );
};

export default LandingPage;
