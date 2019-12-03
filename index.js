ymaps.ready(init);






function init() {
    var myMap = new ymaps.Map("map", {
        center: [39.43, 35.30],
        zoom: 6.4
    }, {
        searchControlProvider: 'yandex#search'
    });

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            myObj.result.map(deprem => {
                myMap.geoObjects
                    .add(new ymaps.Placemark([deprem.lat, deprem.lng], {
                        balloonContent: deprem.title + `<br>`+deprem.mag+" Büyüklüğünde "
                    }, {
                        preset: 'islands#circleDotIcon',
                        iconColor: 'red'
                    }))
            });
        }
    };
    xmlhttp.open("GET", "https://api.orhanaydogdu.com.tr/deprem/live.php", true);
    xmlhttp.send();
}
