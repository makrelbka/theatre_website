class PhotoCarousel {
    constructor(containerSelector, photos, interval = 5000) {
        this.container = document.querySelector(containerSelector);
        this.photos = photos;
        this.currentPhotoIndex = 0;
        this.interval = interval;

        if (!this.container) {
            console.error(`Контейнер "${containerSelector}" не найден.`);
            return;
        }

        this.init();
    }

    init() {
        this.container.innerHTML = '';

        this.photos.forEach(photo => {
            const photoCard = document.createElement('div');
            photoCard.classList.add('photo-card');
            photoCard.style.display = 'none';

            photoCard.innerHTML = `
                <img src="${photo.src}" alt="${photo.alt}" class="photo-image">
            `;

            this.container.appendChild(photoCard);
        });

        this.showPhoto(this.currentPhotoIndex);

        this.startAutoSwitch();
    }

    showPhoto(index) {
        const photoElements = this.container.querySelectorAll('.photo-card');
        photoElements.forEach((element, i) => {
            element.style.display = (i === index) ? 'block' : 'none';
        });
    }

    nextPhoto() {
        this.currentPhotoIndex = (this.currentPhotoIndex + 1) % this.photos.length;
        this.showPhoto(this.currentPhotoIndex);
    }

    startAutoSwitch() {
        setInterval(() => this.nextPhoto(), this.interval);
    }
}


function createPhotoCarousel(containerSelector, jsonPath, interval = 5000) {
    fetch(jsonPath)
        .then(response => response.json())
        .then(photos => {
            new PhotoCarousel(containerSelector, photos, interval);
        })
        .catch(error => console.error(`Ошибка загрузки фотографий из ${jsonPath}:`, error));
}


document.addEventListener('DOMContentLoaded', function () {
    createPhotoCarousel('.photos-container-1', '/data/text/pterodactil.json', 4000);
    createPhotoCarousel('.photos-container-2', '/data/text/gandi.json', 4000);
    createPhotoCarousel('.photos-container-3', '/data/text/explanations_of_love.json', 4000);
    createPhotoCarousel('.photos-container-4', '/data/text/only_13.json', 4000);
    createPhotoCarousel('.photos-container-5', '/data/text/ay_da_balda.json', 4000);
    createPhotoCarousel('.photos-container-6', '/data/text/lenka.json', 4000);
});