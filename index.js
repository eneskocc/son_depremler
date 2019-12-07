ymaps.ready(init);
let main = "";
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
            let div="";
            let i=0;
            myObj.result.map(deprem => {
                i++;
                div+=`
                <div class="text-center w-30 border border-danger rounded f-left p-2 ml-4">
                    <h6>${deprem.title}</h6>
                    <p>${deprem.date}</p
                    <p>Büyüklüğü ${deprem.mag}</p>
                    <p>Derinliği ${deprem.depth}</p>
                </div>
                `;
                if(i%3==0){
                    let carsual="";
                    if(i===3){
                        carsual=`
                        <div class="carousel-item active">
                        ${div}
                        </div>`;
                    }else{
                        carsual=`
                        <div class="carousel-item">
                        ${div}
                        </div>`;
                    }
                    main+=carsual;
                    div="";
                }
                myMap.geoObjects
                    .add(new ymaps.Placemark([deprem.lat, deprem.lng], {
                        balloonContent: deprem.title + `<br>` + deprem.mag + " büyüklüğünde " + `<br>` + deprem.date + `<br>` + deprem.depth + " km derinliğinde"

                    }, {
                        preset: 'islands#circleDotIcon',
                        iconColor: 'red'
                    }))
            });  
            document.getElementById("main").innerHTML=main;
        }

    };

    xmlhttp.open("GET", "https://api.orhanaydogdu.com.tr/deprem/live.php", true);
    xmlhttp.send();

}
