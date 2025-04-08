// Immediately redirect to quiz page when begin button is clicked
window.onload = function() {
  const beginButton = document.getElementById('begin-button');
  
  if (beginButton) {
    beginButton.onclick = function(e) {
      e.preventDefault();
      window.location.replace('/quiz');
      return false;
    };
  }
};