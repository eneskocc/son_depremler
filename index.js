ymaps.ready(init);
let main = "";
let topLat=0;
let topLng=0;
let sayac=0;
function init() {
    var myMap = new ymaps.Map("map", {
        center: [39.43, 35.30],
        zoom: 6.4
    }, {
        searchControlProvider: 'yandex#search'
    });
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            let div = "";
            let i = 0;
           
            myObj.result.map(deprem => {
                i++;
                div += `
                <div class="text-center w-30 border border-danger rounded f-left p-2 ml-4">
                    <h6>${deprem.title}</h6>
                    <p>${deprem.date}<br>
                    Büyüklüğü ${deprem.mag}<br>
                    Derinliği ${deprem.depth}</p>
                </div>
                `;
                if (i % 3 == 0) {
                    let carsual = "";
                    if (i === 3) {
                        carsual = `
                        <div class="carousel-item active">
                        ${div}
                        </div>`;
                    } else {
                        carsual = `
                        <div class="carousel-item">
                        ${div}
                        </div>`;
                    }
                    main += carsual;
                    div = "";
                }
                let color = '';
                if (Number(deprem.mag) < 2) {
                    color = '#FFFF66';
                } else if (Number(deprem.mag) < 3) {
                    color = '#FFCC33';
                } else if (Number(deprem.mag) < 4) {
                    color = '#FF9900';
                } else if (Number(deprem.mag) < 5) {
                    color = '#FF6600';
                } else if (Number(deprem.mag) < 6) {
                    color = 'red';
                } else {
                    color = 'black';
                }
                sayac++;
                topLat+=deprem.lat;
                topLng+=deprem.lng;
                myMap.geoObjects
                    .add(new ymaps.Placemark([deprem.lat, deprem.lng], {
                        balloonContent: deprem.title + `<br>` + deprem.mag + " büyüklüğünde " + `<br>` + deprem.date + `<br>` + deprem.depth + " km derinliğinde"

                    }, {
                        preset: 'islands#circleDotIcon',
                        iconColor: color
                    }))
            });
   
            document.getElementById("main").innerHTML = main;
        }

    };

    xmlhttp.open("GET", "https://api.orhanaydogdu.com.tr/deprem/live.php", true);
    xmlhttp.send();

}
