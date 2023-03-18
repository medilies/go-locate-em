// Initialize map
let map = L.map("map").setView([36.4312, 2.8331], 4);

// Add tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
}).addTo(map);

// Initialize marker layer group
let markers = L.featureGroup().addTo(map);

// Initialize draw control and add to map
let drawControl = new L.Control.Draw({
    draw: {
        polygon: true,
        polyline: false,
        circle: false,
        rectangle: false,
        marker: false,
    },
    edit: {
        featureGroup: markers,
    },
});
map.addControl(drawControl);

// Handle created event when polygon is drawn
map.on(L.Draw.Event.CREATED, function (event) {
    let polygon = event.layer;
    markers.addLayer(polygon);
    savePolygon(polygon);
});

// Function to save polygon to API
function savePolygon(polygon) {
    let perimeter = polygon
        .getLatLngs()[0]
        .map((latlng) => [latlng.lng, latlng.lat]);
    perimeter.push(perimeter[0]);
    let data = {
        perimeter: {
            type: "Polygon",
            coordinates: [perimeter],
        },
    };

    // send a POST request to the API with the GeoJSON data
    fetch("http://127.0.0.1:8000/api/areas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            // handle the response
        })
        .catch((error) => console.error(error));
}

// =====================================

fetch(`http://127.0.0.1:8000/api/areas`)
    .then((response) => response.json())
    .then((data) => {
        data.forEach((area) => {
            // ! reverse long,lat => limited to first polygon
            area.perimeter.coordinates[0].forEach((point, i) => {
                area.perimeter.coordinates[0][i] = [point[1], point[0]];
            });

            var polygon = L.polygon(area.perimeter.coordinates, {
                color: "red",
            }).addTo(map);

            // zoom the map to the polygon
            map.fitBounds(polygon.getBounds());
        });
    })
    .catch((error) => console.error(error));

// Function to add markers to the map
function addMarkers(data) {
    // Clear existing markers
    markers.clearLayers();

    // Loop through the data and add markers to the layer group
    data.forEach((item) => {
        let latlng = [item.latitude, item.longitude];
        let popup = L.popup().setContent(item.name);
        L.marker(latlng).addTo(markers).bindPopup(popup);
    });

    // Fit map to markers
    map.fitBounds(markers.getBounds());
}

// Function to handle search button click
function handleSearch() {
    // Get search query from input
    let query = document.getElementById("search-box").value;

    // Fetch data from API endpoint with search query
    fetch(`http://127.0.0.1:8000/api/search?query=${query}`)
        .then((response) => response.json())
        .then((data) => {
            // Add markers to the map with search results
            addMarkers(data);
        })
        .catch((error) => console.error(error));
}

// Add search button click event listener
document.getElementById("search-btn").addEventListener("click", handleSearch);
