import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw/dist/leaflet.draw.js";

import tileLayer from "./init/addTileLayer";
import getDrawControl from "./init/getDrawControl";
import storeArea from "../../apis/storeArea";

export class Map {
    addArea(geoJSON) {
        const conf = {
            color: "red",
        };

        return L.geoJSON(geoJSON, conf).addTo(this.map);
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

    constructor() {
        // Initialize map
        this.map = L.map("map");
        this.map.setView([29, 2.4], 5);

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
            this._handleGeometryCreated.bind(this)
        );
    }

    // Handle created event when polygon is drawn
    _handleGeometryCreated(event) {
        let geoJson = event.layer.toGeoJSON();

        storeArea(geoJson).then((storedArea) => {
            const area = this.addArea(storedArea.perimeter);
            // console.log(storedArea);

            // zoom the map to the geometry
            this.map.fitBounds(area.getBounds());
        });
    }
}
