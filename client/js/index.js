document.addEventListener('DOMContentLoaded', function() {
    const shortenForm = document.getElementById('shortenForm');
    const shortenedUrlDiv = document.getElementById('shortenedUrl');
    const shortUrlLink = document.getElementById('shortUrlLink');
    const copyButton = document.getElementById('copyButton');
    const urlInput = document.querySelector('input[name="url"]');
    const errorMessageDiv = document.getElementById('errorMessage');
    const errorMessage = document.getElementById('error-message');

    // Function to shorten a URL relative to the hosting URL
    function shorten_url(url) {
        var baseURL = window.location.origin;
        return baseURL + "/" + url;
    }

    shortenForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const urlValue = urlInput.value;

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
                const shortenedURL = shorten_url(data.short_url);

                shortUrlLink.href = shortenedURL;
                shortUrlLink.textContent = shortenedURL;
                shortenedUrlDiv.style.display = 'block';

                copyButton.addEventListener('click', function() {
                    const textArea = document.createElement('textarea');
                    textArea.value = shortenedURL;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);

                    copyButton.textContent = 'Copied!';

                    setTimeout(function() {
                        copyButton.textContent = 'Copy';
                        urlInput.value = '';
                    }, 2000);
                });
            } else if (data.code === 400 && data.message === "Invalid URL.") {
                errorMessage.textContent = data.message;
                errorMessageDiv.style.display = 'block';

                setTimeout(function() {
                    errorMessageDiv.style.display = 'none';
                    urlInput.value = '';

                }, 2000); // 5000 milliseconds = 5 seconds
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
