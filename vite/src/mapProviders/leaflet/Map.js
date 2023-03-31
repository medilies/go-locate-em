import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw/dist/leaflet.draw.js";

import tileLayer from "./init/addTileLayer";
import getDrawControl from "./init/getDrawControl";
import storeArea from "../../apis/storeArea";

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
        storeArea(geometry.toGeoJSON());
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
