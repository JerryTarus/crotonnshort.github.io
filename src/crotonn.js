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