

export function ThemeMode() {
    const Modes = document.querySelectorAll('.ThemeMode');
    function applyTheme(theme) {
        if (theme === 'light') {
            document.body.classList.add('lightMode');
            document.body.classList.remove('darkMode');
            document.querySelector('.darkmode').display='flex';
             document.querySelector('.lightmode').display='none';
           
        } else {
            document.body.classList.remove('lightMode');
            document.body.classList.add('darkMode');
             document.querySelector('.darkmode').display='none';
             document.querySelector('.lightmode').display='flex';
           
        }
    }

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    Modes.forEach(Mode => {
        Mode.addEventListener('click', () => {
            const isLight = document.body.classList.contains('lightMode');
            const newTheme = isLight ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);

        });
    });
}
