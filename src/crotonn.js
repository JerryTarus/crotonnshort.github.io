// JavaScript code to improve site functionalities

document.addEventListener('DOMContentLoaded', function () {
    const shortenButton = document.getElementById('shorten-button');
    const originalUrlInput = document.getElementById('original-url');
    const generatedUrlDiv = document.getElementById('generated-url');
    const shortLink = document.getElementById('short-link');

     // This event listener helps to shorten URL
     shortenButton.addEventListener('click', () => {
        shortenURL();
});


    // Event Listener to listen to submit button on Enter key press
    originalUrlInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            shortenURL();
        }
    });


       // This focuses on input when the page loads
       document.addEventListener('DOMContentLoaded', () => {
        originalUrlInput.focus();
    });

    // This clears input when the user clicks on it
    originalUrlInput.addEventListener('click', () => {
        originalUrlInput.value = '';
    });

    // This hides the shortened URL on click
    shortLink.addEventListener('click', () => {
        generatedUrlDiv.style.display = 'none';
    });

    // This resets input and hide shortened URL on focus
    originalUrlInput.addEventListener('focus', () => {
        originalUrlInput.value = '';
        generatedUrlDiv.style.display = 'none';
    });
// Time to write function to shorten the URL
function shortenURL() {
    const originalUrl = originalUrlInput.value;

    // Bitly API Key for our app (bitly calls it access token, same thing)
    const apiKey = '6fab06a885c7e3b4c88f9aa919496dcfa8f6976a';

    // This clears any previous error messages
    generatedUrlDiv.classList.remove('error');