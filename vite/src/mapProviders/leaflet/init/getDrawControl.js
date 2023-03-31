import L from "leaflet";

export default (markers) =>
    new L.Control.Draw({
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
