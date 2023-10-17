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

        // Fetch API to make an asynchronous POST request to the Bitly API
        fetch(`https://api-ssl.bitly.com/v4/shorten`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                long_url: originalUrl,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.link) {
                // This block will help display the shortened URL
                shortLink.href = data.link;
                shortLink.textContent = data.link;
                generatedUrlDiv.style.display = 'block';
            } else {
                // While this handles cases where the response is not a valid URL
                generatedUrlDiv.classList.add('error');
                shortLink.textContent = 'Invalid URL or API error';
                generatedUrlDiv.style.display = 'block';
            }
        })

        // Error handling
        .catch(error => {
            console.error('Error generating shortened URL:', error);
            generatedUrlDiv.classList.add('error');
            shortLink.textContent = 'Error generating shortened URL';
            generatedUrlDiv.style.display = 'block';
        });
    }
});



// This part handles the Social Media Buttons 
document.addEventListener('DOMContentLoaded', function () {
    const shortenButton = document.getElementById('shorten-button');
    const socialSharing = document.querySelector('.social-sharing');

    // Event Listener to show social media icons after URL is shortened
    shortenButton.addEventListener('click', () => {
        // Access token goes here (API Key)
        const bitlyAccessToken = '6fab06a885c7e3b4c88f9aa919496dcfa8f6976a';
        const originalUrl = document.getElementById('original-url').value;

        shortenURL(originalUrl, bitlyAccessToken).then(shortenedUrl => {
            // Display the social media icons
            socialSharing.classList.remove('hidden');

            // Set the sharing URLs for each platform with the shortened link
            const shareUrl = encodeURIComponent(shortenedUrl);
            socialSharing.querySelector('.fa-facebook').href = `https://www.facebook.com/sharer.php?u=${shareUrl}`;
            socialSharing.querySelector('.fa-whatsapp').href = `https://wa.me/?text=${shareUrl}`;
            socialSharing.querySelector('.fa-instagram').href = `https://www.instagram.com/sharer.php?u=${shareUrl}`;
            socialSharing.querySelector('.fa-twitter').href = `https://twitter.com/intent/tweet?url=${shareUrl}`;
        });
    });

    // Function to shorten the URL using the Bitly API
    async function shortenURL(originalUrl, accessToken) {
        const bitlyApiUrl = 'https://api-ssl.bitly.com/v4/shorten';
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        };

        const data = JSON.stringify({
            long_url: originalUrl,
        });

        const response = await fetch(bitlyApiUrl, {
            method: 'POST',
            headers: headers,
            body: data,
        });

        const result = await response.json();

        if (result.link) {
            return result.link;
        } else {
            throw new Error('Bitly API error');
        }
    }
});

