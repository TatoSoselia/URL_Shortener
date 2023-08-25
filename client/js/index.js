document.addEventListener('DOMContentLoaded', function() {
    const shortenForm = document.getElementById('shortenForm');
    const shortenedUrlDiv = document.getElementById('shortenedUrl');
    const shortUrlLink = document.getElementById('shortUrlLink');
    const copyButton = document.getElementById('copyButton');
    const urlInput = document.querySelector('input[name="url"]'); // Get the input element

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
                shortUrlLink.href = data.short_url;
                shortUrlLink.textContent =  data.short_url;
                shortenedUrlDiv.style.display = 'block';

                copyButton.addEventListener('click', function() {
                    const textArea = document.createElement('textarea');
                    textArea.value = data.short_url;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);

                    copyButton.textContent = 'Copied!';


                    // Reset after a few seconds (e.g., 3 seconds)
                    setTimeout(function() {
                        copyButton.textContent = 'Copy';
                        // shortenedUrlDiv.style.display = 'none';
                        urlInput.value = ''; // Clear the input field again
                    }, 2000); // 3000 milliseconds = 3 seconds
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
