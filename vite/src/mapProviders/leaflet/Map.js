import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw/dist/leaflet.draw.js";

import tileLayer from "./init/addTileLayer";
import getDrawControl from "./init/getDrawControl";

export class Map {
    addGeometry(geoJSON) {
        const conf = {
            color: "red",
        };

        const mapGeometry = L.geoJSON(geoJSON, conf).addTo(this.map);

        // zoom the map to the geometry
        this.map.fitBounds(mapGeometry.getBounds());
    }

    constructor() {
        // Initialize map
        this.map = L.map("map");
        this.map.setView([36.4312, 2.8331], 4);

        // Add tile layer
        tileLayer(this.map);

        // Initialize marker layer group
        this.markers = L.featureGroup().addTo(this.map);

        const drawControl = getDrawControl(this.markers);

        // Initialize draw control and add to map
        this.map.addControl(drawControl);

        // Bind event listeners
        this.map.on(
            L.Draw.Event.CREATED,
            this.handleGeometryCreated.bind(this)
        );
    }

    // Handle created event when polygon is drawn
    handleGeometryCreated(event) {
        let geometry = event.layer;

        this.markers.addLayer(geometry);
        this.saveGeometry(geometry.toGeoJSON());
    }

    // Function to save geometry to API
    saveGeometry(geometry) {
        let data = {
            perimeter: {
                // TODO: directly use geoJson
                type: geometry.geometry.type,
                coordinates: geometry.geometry.coordinates,
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
