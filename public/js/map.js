document.addEventListener("DOMContentLoaded", function () {

  function loadMap(lat, lng) {

    const map = L.map('map').setView([lat, lng], 10);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);


    const cafeIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
  iconSize: [28, 28]
});

const restaurantIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
  iconSize: [28, 28]
});

const hotelIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/139/139899.png",
  iconSize: [28, 28]
});



    // Main marker
    L.marker([lat, lng])
      .addTo(map)
      .bindPopup("📍 You are here")
      .openPopup();

    // Nearby places
    const nearbyPlaces = [
      {
        name: "☕ Cafe",
        lat: lat + 0.01,
        lng: lng + 0.01,
        icon: cafeIcon

      },
      {
        name: "🍽 Restaurant",
        lat: lat - 0.01,
        lng: lng - 0.01,
        icon: restaurantIcon

      },
      {
        name: "🏨 Hotel",
        lat: lat + 0.02,
        lng: lng - 0.02,
        icon: hotelIcon
  
      }
    ];

    nearbyPlaces.forEach(place => {
      L.marker([place.lat, place.lng], { icon: place.icon })
        .addTo(map)
        .bindPopup(place.name);
    });

  }

  // If listing coordinates exist
  if (typeof listingCoordinates !== "undefined" && listingCoordinates) {

    const lat = listingCoordinates[1];
    const lng = listingCoordinates[0];

    loadMap(lat, lng);

  } 
  // Otherwise use user's location
  else if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition((position) => {

      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      loadMap(lat, lng);

    });

  }

});