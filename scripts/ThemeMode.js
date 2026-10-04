

export function ThemeMode() {
    const Modes = document.querySelectorAll('.ThemeMode');
    function applyTheme(theme) {
        if (theme === 'light') {
            document.body.classList.add('lightMode');
            document.body.classList.remove('darkMode');
            Modes.forEach(Mode => {
                Mode.src = '/images/dark-mode.png';
            });
        } else {
            document.body.classList.remove('lightMode');
            document.body.classList.add('darkMode');
            Modes.forEach(Mode => {
                Mode.src = '/images/light-mode.png';
            });
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