let currentReviewIndex = 0;

function showReviews(index) {
    const reviewElements = document.querySelectorAll('.review-card');
    reviewElements.forEach((element, i) => {
        element.style.display = (i === index) ? 'block' : 'none';
    });
}

function nextReview() {
    currentReviewIndex = (currentReviewIndex + 1) % document.querySelectorAll('.review-card').length;
    showReviews(currentReviewIndex);
}

function previousReview() {
    currentReviewIndex = (currentReviewIndex - 1 + document.querySelectorAll('.review-card').length) % document.querySelectorAll('.review-card').length;
    showReviews(currentReviewIndex);
}

document.addEventListener('DOMContentLoaded', function () {
    const reviewsContainer = document.querySelector('.reviews-container');
    reviewsContainer.innerHTML = '';

    fetch('/data/text/reviews.json')
        .then(response => response.json())
        .then(reviews => {
            reviews.forEach((review, index) => {
                const reviewCard = document.createElement('div');
                reviewCard.classList.add('review-card');

                reviewCard.innerHTML = `
                    <div class="review-text">${review.text}</div>
                    <div class="review-author">${review.author}</div>
                `;

                reviewsContainer.appendChild(reviewCard);
            });

            showReviews(currentReviewIndex);
        })
        .catch(error => console.error('Ошибка загрузки отзывов:', error));
});