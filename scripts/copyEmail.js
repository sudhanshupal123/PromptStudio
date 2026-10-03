export function Copy() {
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
    });
};
Copy();
