document.addEventListener('DOMContentLoaded', function() {
  const beginButton = document.getElementById('begin-button');
  const landingPage = document.getElementById('landing-page');
  const root = document.getElementById('root');
  
  beginButton.addEventListener('click', function() {
    // Hide the landing page
    landingPage.style.display = 'none';
    
    // Show the main application
    root.style.display = 'block';
    
    // You might need to trigger any initialization for your main app here
    // For example, if your app uses a custom event to start:
    // document.dispatchEvent(new Event('app-start'));
  });
});