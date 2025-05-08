

document.addEventListener("DOMContentLoaded", function () {
    ymaps.ready(initMap);

    function initMap() {
        var map = new ymaps.Map("map", {
            center: [59.9343, 30.3351], 
            zoom: 15,
            controls: ['zoomControl'] 
        });
        map.behaviors.disable(['scrollZoom', 'dblClickZoom']);

        var placemark = new ymaps.Placemark([59.9343, 30.3351], {
            balloonContent: 'Пушкинская улица, 9, Санкт-Петербург'
        }, {
            preset: 'islands#redDotIcon'
        });

        map.geoObjects.add(placemark);
    }
});