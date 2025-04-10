document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.benefit-card');

    cards.forEach(card => {
        card.addEventListener('click', function() {
            // Перемикаємо клас is-flipped на батьківському елементі .benefit-card
            this.classList.toggle('is-flipped');
        });

        // Додаємо обробку натискання Enter/Space для доступності
        card.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault(); // Запобігаємо стандартній дії (напр., прокрутці при Space)
                this.classList.toggle('is-flipped');
            }
        });
    });

    // Burger Menu Logic
    const burgerButton = document.querySelector('.burger-menu-button');
    const nav = document.querySelector('header nav'); // Уточнений селектор
    const body = document.body; // Будемо додавати клас до body

    if (burgerButton && nav) {
        burgerButton.addEventListener('click', function() {
            // Перемикаємо клас на body
            body.classList.toggle('mobile-nav-active');

            // Оновлюємо атрибут aria-expanded для доступності
            const isExpanded = body.classList.contains('mobile-nav-active');
            this.setAttribute('aria-expanded', isExpanded);
        });

        // Додатково: закривати меню при кліку на посилання (опційно)
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (body.classList.contains('mobile-nav-active')) {
                    body.classList.remove('mobile-nav-active');
                    burgerButton.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }
}); 