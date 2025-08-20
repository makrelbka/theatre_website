

document.addEventListener("DOMContentLoaded", function () {
    ymaps.ready(initMap);

    function initMap() {
        var map = new ymaps.Map("map", {
            center: [59.929641, 30.356732], 
            zoom: 15,
            controls: ['zoomControl'] 
        });
        map.behaviors.disable(['scrollZoom', 'dblClickZoom']);

        var placemark = new ymaps.Placemark([59.929641, 30.356732], {
            balloonContent: 'Пушкинская улица, 9, Санкт-Петербург'
        }, {
            preset: 'islands#redDotIcon'
        });

        map.geoObjects.add(placemark);
    }
});