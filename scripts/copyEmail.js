export function Copy() {
    if (window._copyHandlerAttached) return;
    window._copyHandlerAttached = true;

    document.addEventListener('click', (e) => {
        const button = e.target.closest('.copy-button');
        if (!button) return;

        const promptTextElement = button.closest('.prompt-text')?.querySelector('p');
        if (promptTextElement) {
            const textToCopy = promptTextElement.innerText;

            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalHTML = button.innerHTML;
                button.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';

                setTimeout(() => {
                    button.innerHTML = originalHTML;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        }
    });
}
Copy();

