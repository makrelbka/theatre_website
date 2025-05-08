document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.achievement').forEach(item => {
        item.addEventListener('click', () => {
            const content = item.nextElementSibling;
            const plusMinus = item.querySelector('.toggle-btn');

            if (content.style.display === 'block') {
                content.style.display = 'none';
                plusMinus.textContent = '+';
            } else {
                content.style.display = 'block';
                plusMinus.textContent = '-';
            }
        }); 
    });
});