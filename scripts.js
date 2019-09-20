
// Je crée une nouvelle carte et je la personnalise avec Mapbox
const mymap = L.map('issMap').setView([0, 0], 3);
const attribution = '&copy; <a href="https://openstreetmap.org/copyright">Openstreetmap</a>'
const tileUrl = 'https://api.mapbox.com/styles/v1/imanejarm/ck0azrbem37l21cljwhxfeqwx/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaW1hbmVqYXJtIiwiYSI6ImNqbmtiaWI5ODEzNm0zcG5ydW9jdDd2bjgifQ.HanFBqzlyf2ZFYcmeZVZ3A';
const tiles = L.tileLayer(tileUrl, {attribution} );
tiles.addTo(mymap);

// Je crée l'icone qui vaa représenter la station spatiale

var issIcon = L.icon({
  iconUrl: 'icone_petite.svg',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [-3, -76]
});

const marker = L.marker([0, 0], {icon: issIcon}).addTo(mymap);


// Je me connecte à l'API et je transforme les données en format JSON
const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';
let firstTime = true;
async function getISS() {
  const response = await fetch(api_url);
  const data = await response.json();
// J'utilise la déstructuration  pour avoir deux constantes qui vont contenir la latitude et longitude
  const {longitude, latitude} = data;
  marker.setLatLng([latitude, longitude]);
  if (firstTime) {
    mymap.setView([latitude, longitude], 3);
    firstTime = false;
  }
 
 // Je visualise la position courante de l'ISS sur la carte: 
  document.getElementById('lon').textContent = longitude.toFixed(2) + '°';
  document.getElementById('lat').textContent = latitude.toFixed(2)+ '°';
  
}

getISS();

setInterval(getISS, 1000);

/* Fin du code de récuperation des données API */

// Effet burger menu

$('.bouton').on('click', function(){
  $('nav ul').toggleClass('visible');
});

// Effet scrollbar

document.addEventListener("DOMContentLoaded", function() {
	
	OverlayScrollbars(document.querySelectorAll("body"), {
    
   });
});
