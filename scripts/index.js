document.addEventListener('DOMContentLoaded', () => {
    const copyButtons = document.querySelectorAll('.copy-button');

    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const promptTextElement = button.closest('.prompt-text').querySelector('p');
            if (promptTextElement) {
                const textToCopy = promptTextElement.innerText;
                
                navigator.clipboard.writeText(textToCopy).then(() => {
                    // Update button content to show success
                    const originalHTML = button.innerHTML;
                    button.innerHTML = '<i class="fa-solid fa-check"></i>Copied!';
                    
                    // Revert back after 2 seconds
                    setTimeout(() => {
                        button.innerHTML = originalHTML;
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                });
            }
        });
    });

    // Feedback functionality
    const feedbackBtn = document.getElementById('feedback-submit-btn');
    if (feedbackBtn) {
        feedbackBtn.addEventListener('click', () => {
            const name = document.getElementById('feedback-name').value.trim();
            const email = document.getElementById('feedback-email').value.trim();
            const message = document.getElementById('feedback-message').value.trim();

            if (!name || !email || !message) {
                alert('Please fill out all the fields before submitting.');
                return;
            }

            // Change button to indicate loading
            const originalText = feedbackBtn.innerHTML;
            feedbackBtn.innerHTML = 'Sending...';
            feedbackBtn.disabled = true;

            // Send feedback silently using formsubmit.co API without opening mail apps
            fetch("https://formsubmit.co/ajax/sudhanshupal.9654@gmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,                // FormSubmit explicitly looks for "name" to set the Sender Name
                    email: email,              // FormSubmit explicitly looks for "email" to set the Sender Email
                    message: message,
                    _template: "box",          // Sends a much cleaner email template instead of generic text
                    _replyto: email,
                    _cc: "sudhanshupal.9654@outlook.com",
                    _subject: "Prompt Studio Feedback"
                })
            })
            .then(response => response.json())
            .then(data => {
                // Custom popup notification (toast) that appears for exactly 5 seconds
                const toast = document.createElement('div');
                toast.innerHTML = '<strong>Your Message Send</strong><br>Thanks For Send Your Feedback';
                toast.style.position = 'fixed';
                toast.style.width = '300px';
                toast.style.height = '100px';
                toast.style.top = '100px';
                toast.style.backgroundColor = '#232629ff';
                toast.style.color = '#ffffff';
                toast.style.padding = '15px 25px';
                toast.style.borderRadius = '8px';
                toast.style.left = '50%';
                toast.style.transform = 'translateX(-50%)';
                toast.style.zIndex = '10000';
                toast.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';
                toast.style.fontFamily = "'Outfit', sans-serif";
                toast.style.transition = 'opacity 0.5s ease';
                document.body.appendChild(toast);

                // Make it disappear cleanly after 5 seconds
                setTimeout(() => {
                    toast.style.opacity = '0';
                    setTimeout(() => toast.remove(), 500); // 500ms for completely fading out
                }, 5000);
                
                // Clear the inputs
                document.getElementById('feedback-name').value = '';
                document.getElementById('feedback-email').value = '';
                document.getElementById('feedback-message').value = '';

                // Restore button
                feedbackBtn.innerHTML = originalText;
                feedbackBtn.disabled = false;
            })
            .catch(error => {
                alert("An error occurred while sending your message. Please try again.");
                console.error(error);
                
                // Restore button
                feedbackBtn.innerHTML = originalText;
                feedbackBtn.disabled = false;
            });
        });
    }
});
