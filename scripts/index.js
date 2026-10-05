import { ThemeMode } from "./ThemeMode.js";
ThemeMode();

async function loadMainData() {
    const paths = ['./json/main.json', 'json/main.json', '../json/main.json'];
    for (const path of paths) {
        try {
            const response = await fetch(path);
            if (response.ok) return await response.json();
        } catch (e) { }
    }
    throw new Error(`Error:${response.status}`);
}

document.querySelector('.createdPrompt').innerHTML = `${localStorage.getItem('PromptCount')}+`

function fetchMainData() {
    loadMainData().then(data => {
        let MainPageHTML = '';
        document.querySelector('.heroCategory').innerHTML = `${data.length}+`;
        data.forEach((datas, i) => {
            const promptKey = datas.CardNo ? datas.CardNo.replace('#I', 'G') : `G${String(i + 1).padStart(2, '0')}`;//G01

            MainPageHTML += `<div class="prompt-box" data-idx="${i}" data-key="${promptKey}" data-card="${datas.CardNo}">
                    <div class="gemini-img1">
                        <a><img
                                src="./gemini_img/${datas.Image}" alt="${datas.Catogery}">
                            <div class="card-category">${datas.Catogery}</div>
                            <div class="card-num">${datas.CardNo}</div>
                        </a>
                    </div>
                </div>`;
        });

        const promptDiv = document.querySelector('.prompt');

        if (!promptDiv) return;
        promptDiv.innerHTML = MainPageHTML;


        promptDiv.addEventListener('click', (e) => {
            const box = e.target.closest('.prompt-box');
            if (!box || !promptDiv.contains(box)) return;
            const promptKey = box.dataset.key || `G${String(Number(box.dataset.idx) + 1).padStart(2, '0')}`;
            try {
                localStorage.setItem('selectedPromptKey', promptKey);
            } catch (err) {
                console.warn('Could not save to localStorage', err);
            }

            // Open PromptStudio.html passing key in query string
            window.location.href = `gemini_prompt/PromptStudio.html?id=${encodeURIComponent(promptKey)}`;

        });
    }).catch(error => {
        throw new Error('Error:', error);
    });
}
fetchMainData();

function Email() {
    const setupEmail = () => {
        const feedbackBtn = document.getElementById('feedback-submit-btn');
        if (!feedbackBtn) return;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
        const errorM = document.querySelector('.infoMessage');
        const mailsend = document.querySelector('.Mailsend');
        const mailP = document.querySelector('.Mailsend p');

        feedbackBtn.addEventListener('click', async () => {
            const name = document.getElementById('feedback-name').value.trim();
            const email = document.getElementById('feedback-email').value.trim();
            const message = document.getElementById('feedback-message').value.trim();

            // Validate before sending
            if (!name || !emailPattern.test(email) || !message) {
                if (errorM) {
                    errorM.style.display = 'flex';
                    errorM.style.opacity = '1';
                    setTimeout(() => {
                        errorM.style.display = 'none';
                    }, 2000);
                }
                return;
            }

            const originalText = feedbackBtn.innerHTML;
            feedbackBtn.innerHTML = 'Sending...';
            feedbackBtn.disabled = true;

            try {
                // Send feedback using formsubmit.co AJAX endpoint to both Gmail & Outlook
                const response = await fetch("https://formsubmit.co/ajax/sudhanshupal.9654@gmail.com", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        message: message,
                        _template: "box",
                        _replyto: email,
                        _cc: "sudhanshupal.9654@outlook.com",
                        _subject: "PromptStudio Feedback"
                    })
                });

                const data = await response.json();

                if (response.ok && (data.success === true || data.success === "true")) {
                    if (mailsend) {
                        mailsend.style.display = 'flex';
                        mailsend.style.opacity = '1';
                        if (mailP) mailP.textContent = `Success: Feedback sent!`;
                        setTimeout(() => {
                            mailsend.style.opacity = '0';
                            setTimeout(() => {
                                mailsend.style.display = 'none';
                            }, 500);
                        }, 2500);
                    }
                    document.getElementById('feedback-name').value = '';
                    document.getElementById('feedback-email').value = '';
                    document.getElementById('feedback-message').value = '';
                } else {
                    throw new Error(data.message || 'Submission rejected by mail service');
                }
            } catch (error) {
                console.error('Mail error:', error);
                if (errorM) {
                    const errorP = errorM.querySelector('p');
                    if (errorP) errorP.textContent = error.message || 'Error: Could not send feedback';
                    errorM.style.display = 'flex';
                    errorM.style.opacity = '1';
                    setTimeout(() => {
                        errorM.style.display = 'none';
                    }, 4000);
                }
            } finally {
                feedbackBtn.innerHTML = originalText;
                feedbackBtn.disabled = false;
            }
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupEmail);
    } else {
        setupEmail();
    }
}
Email();

function Humburder() {
    const humburderOpen = document.querySelector('.humburderOpen');

    const humburderClose = document.querySelector('.humburderClose');
    humburderClose.addEventListener('click', () => {
        humburderClose.style.display = 'none';
        humburderOpen.style.display = 'flex';
        const navLinks = document.querySelector('.navbar-links');
        navLinks.style.display = 'flex';
        navLinks.classList.add('navbar-links-humberger')
    })

    humburderOpen.addEventListener('click', () => {
        humburderClose.style.display = 'flex';
        humburderOpen.style.display = 'none';
        const navLinks = document.querySelector('.navbar-links');
        navLinks.style.display = 'none';
    })
}
Humburder();
