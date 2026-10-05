import { Copy } from './copyEmail.js';
import { ThemeMode } from './ThemeMode.js';
ThemeMode();
async function loadPromptJson() {
    const paths = ['../json/Prompt.json', './json/Prompt.json', 'json/Prompt.json'];
    for (const path of paths) {
        try {
            const response = await fetch(path);
            if (response.ok) {
                return await response.json();
            }
        } catch (e) { }
    }
    throw new Error(`Error:Prompt.json${e}`);
}

export function fetchPromptData() {
    // 1. Get the prompt.key from URL query string or localStorage
    const urlParams = new URLSearchParams(window.location.search);

    let selectedKey = urlParams.get('id') || urlParams.get('prompt') || urlParams.get('category');

    if (!selectedKey) {
        try {
            selectedKey = localStorage.getItem('selectedPromptKey');
        } catch (err) { }
    }

    // Normalize key (e.g., '#I02' -> 'G02', '2' -> 'G02')
    if (!selectedKey) {
        selectedKey = 'G01';
    } else if (selectedKey.startsWith('#I')) {
        selectedKey = selectedKey.replace('#I', 'G');
    } else if (/^\d+$/.test(selectedKey)) {
        selectedKey = 'G' + String(selectedKey).padStart(2, '0');
    }

    loadPromptJson().then(data => {
        const promptsList = data[selectedKey] || data['G01'] || Object.values(data)[0] || [];
        const createdPromptCount = Object.values(data).flat().length;
        localStorage.setItem('PromptCount', createdPromptCount);
        const pageNo = document.getElementById('pageNo');
        if (pageNo) {
            const num = parseInt(selectedKey.replace(/\D/g, ''), 10);
            pageNo.textContent = `AI Prompt ${num || 1}`;
        }
        let PromptHTML = '';
        promptsList.forEach((datas) => {
            PromptHTML += `<div class="prompt-box">
                    <div class="prompt-img">
                        <img src="${'..'}/gemini_img/${datas.Image}" alt="AI Generated Image" onerror="this.onerror=null; this.src='/gemini_img/${datas.Image}'">
                        <a class="prompt-number">${datas.CardNo}</a>
                    </div>
                    <div class="prompt-text">
                        <p>${datas.PromptText}</p>
                        <button class="copy-button">
                            <i class="fa-solid fa-copy"></i>Copy
                        </button>
                    </div>
                </div>`;
        });

        const promptsContainer = document.querySelector('.prompts');
        if (promptsContainer) {
            promptsContainer.innerHTML = PromptHTML;
        }
        Copy();
    }).catch(error => {
        console.error('Error fetching Prompt.json:', error);
    });

}
fetchPromptData();


