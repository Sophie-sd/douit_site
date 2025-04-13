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
    const animatedElements = document.querySelectorAll('.reveal-on-scroll');

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

    // --- Blog Modal Logic ---
    const modal = document.getElementById('articleModal');
    const modalTriggers = document.querySelectorAll('.article-modal-trigger');
    const modalCloseButton = modal ? modal.querySelector('.modal-close') : null;
    const modalOverlay = modal ? modal.querySelector('.modal-overlay') : null;

    if (modal && modalTriggers.length > 0 && modalCloseButton && modalOverlay) {
        const modalContent = modal.querySelector('.modal-content'); // Нам потрібен цей елемент для фону
        const modalDate = modal.querySelector('.modal-date');
        const modalTitle = modal.querySelector('.modal-title');
        const modalExcerpt = modal.querySelector('.modal-excerpt');
        const modalFullContentContainer = modal.querySelector('.modal-full-content'); // Контейнер для повного тексту

        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(event) {
                event.preventDefault(); // Запобігаємо переходу за посиланням #

                // Знаходимо батьківську картку
                const card = this.closest('.article-card');
                if (!card) return;

                // Отримуємо дані з атрибутів картки
                const imageSrc = card.dataset.imageSrc || '';
                const date = card.dataset.date || '';
                const title = card.dataset.title || '';
                const excerpt = card.dataset.excerpt || '';
                const contentId = card.dataset.modalContentId || null; // Отримуємо ID контенту

                // Заповнюємо модальне вікно
                if (modalContent) {
                    modalContent.style.backgroundImage = `url(${imageSrc})`;
                }
                if (modalDate) modalDate.textContent = date;
                if (modalTitle) modalTitle.textContent = title;
                if (modalExcerpt) modalExcerpt.textContent = excerpt;

                // Знаходимо та вставляємо повний контент
                if (modalFullContentContainer && contentId) {
                    const hiddenContent = document.getElementById(contentId);
                    if (hiddenContent) {
                        // Просто копіюємо вміст прихованого div
                        modalFullContentContainer.innerHTML = hiddenContent.innerHTML;
                    } else {
                        modalFullContentContainer.innerHTML = '<p><em>Повний текст статті не знайдено.</em></p>';
                    }
                } else if (modalFullContentContainer) {
                     // Якщо немає ID контенту, показуємо текст за замовчуванням або очищуємо
                     modalFullContentContainer.innerHTML = '<p><em>(Тут буде повний текст статті...)</em></p>'; // Або можна залишити порожнім
                }

                // Показуємо модальне вікно
                modal.classList.add('is-open');
                document.body.classList.add('modal-open'); // Блокуємо скрол body
            });
        });

        // Функція закриття модального вікна
        const closeModal = () => {
            modal.classList.remove('is-open');
            document.body.classList.remove('modal-open'); // Розблоковуємо скрол body
            // Очищуємо фон, щоб не було миготіння старого зображення при наступному відкритті
            if (modalContent) {
                modalContent.style.backgroundImage = 'none';
            }
            // Очищуємо також і текстовий контент
            if (modalDate) modalDate.textContent = '';
            if (modalTitle) modalTitle.textContent = '';
            if (modalExcerpt) modalExcerpt.textContent = '';
            if (modalFullContentContainer) modalFullContentContainer.innerHTML = '';
        };

        // Закриття по кліку на хрестик
        modalCloseButton.addEventListener('click', closeModal);

        // Закриття по кліку на фон
        modalOverlay.addEventListener('click', closeModal);

        // Закриття по натисканню Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.classList.contains('is-open')) {
                closeModal();
            }
        });
    }

}); 