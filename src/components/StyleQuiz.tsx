
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface StyleQuizProps {
  onClose: () => void;
}

const StyleQuiz: React.FC<StyleQuizProps> = ({ onClose }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Save to local storage that quiz has been seen
    localStorage.setItem('hasSeenStyleQuiz', 'true');
    
    // Navigate to quiz page for full experience
    navigate('/quiz');
    
    // Call the onClose function to clean up
    onClose();
  }, [navigate, onClose]);
  
  return null; // No UI needed since we're redirecting
};

export default StyleQuiz;
