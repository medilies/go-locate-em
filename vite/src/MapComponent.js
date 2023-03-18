import { Map } from "./Map.js";

export class MapComponent {
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
                    if (
                        area.perimeter.type === "Polygon" ||
                        area.perimeter.type === "MultiPolygon"
                    ) {
                        this.map.addGeometry(area.perimeter);
                    }
                });
            })
            .catch((error) => console.error(error));
    }

    displaySearchResult(data) {
        this.map.drawMarkers(data);
    }
}
