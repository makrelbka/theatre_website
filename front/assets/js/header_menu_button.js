function showmenu() {
    const btn = document.getElementById('mobile-menu-btn-yooou');
    const menu = document.querySelector('.mobile-nav');

    if (btn && menu) {
        console.log('Кнопка нажата!');
        btn.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    } else {
        console.error('Не найдены элементы меню!');
    }
}


