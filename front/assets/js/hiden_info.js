document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.achievement').forEach(item => {
        item.addEventListener('click', () => {
            const seasonContent = item.nextElementSibling; // ищем контейнер сезона
            const plusMinus = item.querySelector('.toggle-btn');

            seasonContent.classList.toggle('active'); // переключаем класс
            plusMinus.textContent = seasonContent.classList.contains('active') ? '−' : '+';
        });
    });
});
