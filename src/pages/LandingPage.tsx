
import { useNavigate } from 'react-router-dom';
import '../landing.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleBeginClick = () => {
    navigate('/quiz');
  };

  return (
    <div id="landing-page">
      <h1>WELCOME TO<br />FASHION:WEEK</h1>
      <button id="begin-button" onClick={handleBeginClick}>begin</button>
    </div>
  );
};

export default LandingPage;
