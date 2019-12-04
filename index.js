ymaps.ready(init);
let pano = "";
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
                pano += `
                <div class="swiper-slide border border-danger mt-3 text-center p-2 rounded">
                    <p class="text-danger">${deprem.title}</p>
                    <p>${deprem.mag} büyüklüğnde</p>
                    <p>${deprem.date}</p>
                </div>
                `;
                myMap.geoObjects
                    .add(new ymaps.Placemark([deprem.lat, deprem.lng], {
                        balloonContent: deprem.title + `<br>` + deprem.mag + " büyüklüğünde " + `<br>` + deprem.date + `<br>` + deprem.depth + " km derinliğinde"

                    }, {
                        preset: 'islands#circleDotIcon',
                        iconColor: 'red'
                    }))
            });
            document.getElementById("pano").innerHTML = pano;
         
        }

    };

    xmlhttp.open("GET", "https://api.orhanaydogdu.com.tr/deprem/live.php", true);
    xmlhttp.send();

}


