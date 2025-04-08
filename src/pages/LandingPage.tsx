import { useNavigate } from 'react-router-dom';
import '../landing.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleBeginClick = () => {
    // Navigate to the quiz page
    navigate('/quiz');
  };

  return (
    <div id="landing-page">
      <h1>WELCOME TO FASHION:WEEK</h1>
      <button id="begin-button" onClick={handleBeginClick}>begin</button>
    </div>
  );
};

export default LandingPage;
