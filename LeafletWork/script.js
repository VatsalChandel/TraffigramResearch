// Initialize variables for first lat/long and second lat/long
// Points will represent the markers 
var
    firstLatLng,
    firstPoint,
    secondLatLng,
    secondPoint,
    distance,
    length,
    polyline

// Start map at Red Square approx
map = L.map('map').setView([47.655777, -122.309388], 15);

// Open street maps maps -> No traffic/time data only meters 
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


map.on('click', function(e) {

    if (!firstLatLng) {
        firstLatLng = e.latlng;
        firstPoint = e.layerPoint;
        L.marker(firstLatLng).addTo(map).bindPopup('Point A<br/>' + e.latlng + '<br/> Pixels: ' + e.layerPoint).openPopup();
    } else {
        secondLatLng = e.latlng;
        secondPoint = e.layerPoint;
        L.marker(secondLatLng).addTo(map).bindPopup('Point B<br/>' + e.latlng + '<br/> Pixels: ' + e.layerPoint).openPopup();
    }

    if (firstLatLng && secondLatLng) {
        L.polyline([firstLatLng, secondLatLng], {
        color: 'red'
        }).addTo(map);

        refreshDistanceAndLength();
    }
    })

    map.on('zoomend', function(e) {
    refreshDistanceAndLength();
})

function refreshDistanceAndLength() {
    distance = L.GeometryUtil.distance(map, firstLatLng, secondLatLng);
    length = L.GeometryUtil.length([firstPoint, secondPoint]);
    document.getElementById('distance').innerHTML = distance;
    document.getElementById('length').innerHTML = length;
}