document.addEventListener('DOMContentLoaded', function() {
    const shortenForm = document.getElementById('shortenForm');
    const shortenedUrlDiv = document.getElementById('shortenedUrl');
    const shortUrlLink = document.getElementById('shortUrlLink');
    const copyButton = document.getElementById('copyButton');
    const urlInput = document.querySelector('input[name="url"]'); // Get the input element

    // Function to shorten a URL relative to the hosting URL
    function shorten_url(url) {
        // Get the hosting URL (base URL)
        var baseURL = window.location.origin;

        // Check if the input URL starts with the baseURL
        if (url.startsWith(baseURL)) {
            // If it does, return the relative path
            return url.substring(baseURL.length);
        } else {
            // If not, return the input URL as is
            return url;
        }
    }

    shortenForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const urlValue = urlInput.value; // Store the input value

        const requestData = {
            url: urlValue
        };

        fetch('/url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.short_url) {
                const shortenedURL = shorten_url(data.short_url); // Shorten the URL

                shortUrlLink.href = shortenedURL; // Set the shortened URL as the link href
                shortUrlLink.textContent = shortenedURL; // Display the shortened URL
                shortenedUrlDiv.style.display = 'block';

                copyButton.addEventListener('click', function() {
                    const textArea = document.createElement('textarea');
                    textArea.value = shortenedURL;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);

                    copyButton.textContent = 'Copied!';

                    // Reset after a few seconds (e.g., 3 seconds)
                    setTimeout(function() {
                        copyButton.textContent = 'Copy';
                        urlInput.value = ''; // Clear the input field again
                    }, 2000); // 2000 milliseconds = 2 seconds
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
