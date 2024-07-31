let map;
let marker;

function init() {
    initMap();
    setInterval(getLatLong, 4000);
}

function initMap() {
    map = L.map('map').setView([47.216671, -1.55], 13)    

    let station = L.icon({
        iconUrl: 'image/iss.png',
        iconSize: [64, 64],
        iconAnchor: [32, 32],
        popupAnchor: [-3, -76]
    })
    
    marker = L.marker([47.216671, -1.55], {icon: station}).addTo(map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}

function getLatLong() {
    fetch('http://api.open-notify.org/iss-now.json')
        .then(r => r.json())
        .then(json => {
            const latitude = json["iss_position"]["latitude"];
            const longitude = json["iss_position"]["longitude"];

            document.getElementById('coordonnees').innerText = "Latitude : "+latitude+" / Longitude : "+longitude;

            marker.setLatLng([latitude,longitude]);

            map.flyTo([latitude,longitude]);
        })
};

onload = init;


