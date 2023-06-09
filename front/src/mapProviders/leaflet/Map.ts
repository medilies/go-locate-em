/// <reference types="@types/leaflet" />
import L from "leaflet";
import "leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

import tileLayer from "./init/addTileLayer";
import getDrawControl from "./init/getDrawControl";

import storeArea from "../../apis/storeArea";

import Area from "../../types/Area";

export class Map {
    private map: L.Map;
    private markers: L.FeatureGroup;

    constructor(id:string) {
        this.map = L.map(id);
        this.map.setView([28, 3], 5);

        tileLayer(this.map);

        this.markers = L.featureGroup().addTo(this.map);

        const drawControl = getDrawControl(this.markers);

        this.map.addControl(drawControl);

        this.map.on(
            L.Draw.Event.CREATED,
            this._handleGeometryCreated.bind(this)
        );
    }

    addArea(area: Area) {
        const conf: L.PathOptions = {
            color: "red",
        };

        return L.geoJSON(area.perimeter, conf).addTo(this.map).bindTooltip(area.name);
    }

    drawMarkers(data: { latitude: number; longitude: number; name: string }[]): void {
        this.markers.clearLayers();

        data.forEach((item) => {
            let latlng = [item.latitude, item.longitude];
            let popup = L.popup().setContent(item.name);

            L.marker(latlng).addTo(this.markers).bindPopup(popup);
        });

        this.map.fitBounds(this.markers.getBounds());
    }

    private _handleGeometryCreated(event: L.DrawEvents.Created) {
        let geoJson = event.layer.toGeoJSON();

        const name = prompt("Enter area name:");

        // TODO: directly use geoJson
        storeArea({
            name,
            perimeter: {
                type: geoJson.geometry.type,
                coordinates: geoJson.geometry.coordinates,
            },
        }).then((storedArea:Area) => {
            console.log(storedArea);

            const area = this.addArea(storedArea);
            // console.log(storedArea);

            // zoom the map to the geometry
            this.map.fitBounds(area.getBounds());
        });
    }
}
