document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.benefit-card');

    cards.forEach(card => {
        card.addEventListener('click', function() {
            // Перемикання класу is-flipped для анімації
            this.classList.toggle('is-flipped');
        });

        // Обробка натискання Enter/Space для доступності
        card.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault(); // Запобігаємо стандартній дії
                this.classList.toggle('is-flipped');
            }
        });
    });

    // Burger Menu Logic
    const burgerButton = document.querySelector('.burger-menu-button');
    const nav = document.querySelector('header nav'); 
    const body = document.body; 

    if (burgerButton && nav) {
        burgerButton.addEventListener('click', function() {
            // Перемикання класу на body для показу/приховування мобільного меню
            body.classList.toggle('mobile-nav-active');

            // Оновлення aria-expanded для доступності
            const isExpanded = body.classList.contains('mobile-nav-active');
            this.setAttribute('aria-expanded', isExpanded);
        });

        // Закриття меню при кліку на посилання
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (body.classList.contains('mobile-nav-active')) {
                    body.classList.remove('mobile-nav-active');
                    burgerButton.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // Intersection Observer для анімації при скролі
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // Перевірка, чи є елементи для спостереження
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // Якщо елемент з'явився у viewport
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Припиняємо спостереження після першої анімації
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px', // Налаштування відступу
            threshold: 0.1 // Відсоток видимості для спрацювання
        });

        // Починаємо спостерігати за кожним елементом
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    } 
    // else { 
    //     console.log('No elements found for scroll animation.'); 
    //     // Можна розкоментувати для дебагу, якщо елементи не знаходяться
    // }
}); 