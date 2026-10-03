import { Copy } from './copyEmail.js';
Copy();
console.log('err')
function fetchPromptData() {
    fetch('../json/Prompt.json').then(response => {
        if (!response.ok) {
            throw new Error(`HTPPS error! Status:${response.status}`)
        }
        return response.json()
    }).then(data => {
        let PromptHTML = '';

        data.G01.forEach((datas) => {
            PromptHTML += `<div class="prompt-box">
                    <div class="prompt-img">
                        <img src="/gemini_img/${datas.Image}">
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
        document.querySelector('.prompts').innerHTML = PromptHTML;
    })
};
fetchPromptData();