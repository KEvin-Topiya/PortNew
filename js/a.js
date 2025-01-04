document.getElementById('feedbackForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission
  
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    try {
      // Send POST request to the backend API
      const response = await fetch('https://feedbackapi-2ril.onrender.com/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit feedback.');
      }
  
      const result = await response.json();
      console.log(result.message); // Log success message
      alert('Feedback submitted successfully!');
  
      // Clear the form fields
      document.getElementById('feedbackForm').reset();
  
      // Refresh the feedback list to show the new feedback
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('An error occurred while submitting feedback.');
    }
  });
  
//certigficate
function showimg(e) {
    var simg = document.querySelector('.showimg')
    simg.style.display = "flex";
    simg.querySelector("img").src = e.src

    simg.querySelector('.cls').onclick = function () {
        simg.style.display = "none";
    }
}
