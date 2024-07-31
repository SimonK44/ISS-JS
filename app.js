// setInterval(creationMap, 2000);
creationMap();

function creationMap() {
    fetch('http://api.open-notify.org/iss-now.json')
        .then(r => r.json())
        .then(reponse => {

    let latitude = document.createElement('p');
    let longitude = document.createElement('p');
    latitude.innerText = "Latitude = " + reponse["iss_position"]["latitude"];
    longitude.innerText = "Longitude = " + reponse["iss_position"]["longitude"];
    document.getElementById('coordonnees').appendChild(latitude);
    document.getElementById('coordonnees').appendChild(longitude);

    map = L.map('map').setView([51.505, -0.09], 13);        

    let station = L.icon({
        iconUrl: 'image/iss.png',
        iconSize: [38, 95], // size of the icon
    });

    marker = L.marker([51.505, -0.09], {icon: station}).addTo(map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    map.flyTo(([reponse["iss_position"]["latitude"], reponse["iss_position"]["longitude"]]));
   
    })

}



