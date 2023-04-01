/// <reference types="@types/leaflet" />
import L from "leaflet";
import "leaflet-draw";

export default (markers:L.FeatureGroup) =>
    new L.Control.Draw({
        draw: {
            // polygon: true,
            polyline: false,
            circle: false,
            rectangle: false,
            marker: false,
        },
        edit: {
            featureGroup: markers,
        },
    });
