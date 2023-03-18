class MapApp {
    constructor() {
        // Initialize map
        this.map = L.map("map").setView([36.4312, 2.8331], 4);

        // Add tile layer
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
        }).addTo(this.map);

        // Initialize marker layer group
        this.markers = L.featureGroup().addTo(this.map);

        // Initialize draw control and add to map
        this.drawControl = new L.Control.Draw({
            draw: {
                polygon: true,
                polyline: false,
                circle: false,
                rectangle: false,
                marker: false,
            },
            edit: {
                featureGroup: this.markers,
            },
        });
        this.map.addControl(this.drawControl);

        // Bind event listeners
        this.map.on(L.Draw.Event.CREATED, this.handlePolygonCreated.bind(this));

        document
            .getElementById("search-btn")
            .addEventListener("click", this.handleSearch.bind(this));
    }

    // Handle created event when polygon is drawn
    handlePolygonCreated(event) {
        let polygon = event.layer;
        this.markers.addLayer(polygon);
        this.savePolygon(polygon);
    }

    // Function to save polygon to API
    savePolygon(polygon) {
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

    // Function to add markers to the map
    addMarkers(data) {
        // Clear existing markers
        this.markers.clearLayers();

        // Loop through the data and add markers to the layer group
        data.forEach((item) => {
            let latlng = [item.latitude, item.longitude];
            let popup = L.popup().setContent(item.name);
            L.marker(latlng).addTo(this.markers).bindPopup(popup);
        });

        // Fit map to markers
        this.map.fitBounds(this.markers.getBounds());
    }

    // Function to handle search button click
    handleSearch() {
        // Get search query from input
        let query = document.getElementById("search-box").value;

        // Fetch data from API endpoint with search query
        fetch(`http://127.0.0.1:8000/api/search?query=${query}`)
            .then((response) => response.json())
            .then((data) => {
                // Add markers to the map with search results
                this.addMarkers(data);
            })
            .catch((error) => console.error(error));
    }
}

const map = new MapApp();

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
            }).addTo(map.map);

            // zoom the map to the polygon
            map.map.fitBounds(polygon.getBounds());
        });
    })
    .catch((error) => console.error(error));
