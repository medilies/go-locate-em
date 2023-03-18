class MapComponent {
    constructor(id) {
        this.id = id;
        this.map = new Map(this.id);

        this.onMount();
    }

    onMount() {
        // TODO: refactor to refresh map areas
        fetch(`http://127.0.0.1:8000/api/areas`)
            .then((response) => response.json())
            .then((data) => {
                data.forEach((area) => {
                    // ! reverse long,lat => limited to first polygon
                    // TODO: use geo objects with reverse long,lat interface
                    area.perimeter.coordinates[0].forEach((point, i) => {
                        area.perimeter.coordinates[0][i] = [point[1], point[0]];
                    });

                    this.map.addPolygon(area.perimeter.coordinates);
                });
            })
            .catch((error) => console.error(error));
    }

    displaySearchResult(data) {
        this.map.drawMarkers(data);
    }
}

class Map {
    addPolygon(geoJson) {
        let polygon = L.polygon(geoJson, {
            color: "red",
        }).addTo(this.map);

        // zoom the map to the polygon
        this.map.fitBounds(polygon.getBounds());
    }

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

    /**
     *
     * @param {*} data list points
     */
    drawMarkers(data) {
        this.markers.clearLayers();

        data.forEach((item) => {
            let latlng = [item.latitude, item.longitude];
            let popup = L.popup().setContent(item.name);

            L.marker(latlng).addTo(this.markers).bindPopup(popup);
        });

        this.map.fitBounds(this.markers.getBounds());
    }
}

const map = new MapComponent("map");

document.getElementById("search-btn").addEventListener("click", () => {
    let query = document.getElementById("search-box").value;

    fetch(`http://127.0.0.1:8000/api/search?query=${query}`)
        .then((response) => response.json())
        .then((data) => {
            map.displaySearchResult(data);
        })
        .catch((error) => console.error(error));
});
