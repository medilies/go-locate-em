import getAreas from "./apis/getAreas";
import { Map as LeafletMap } from "./mapProviders/leaflet/Map";

export class MapComponent {
    constructor(id) {
        this.id = id;
        this.map = new LeafletMap(this.id);

        this.onMount();
    }

    onMount() {
        // TODO: refactor to refresh map areas
        getAreas().then((data) => {
            data.forEach((area) => {
                if (
                    area.perimeter.type === "Polygon" ||
                    area.perimeter.type === "MultiPolygon"
                ) {
                    this.map.addArea(area.perimeter);
                }
            });
        });
    }

    displaySearchResult(data) {
        this.map.drawMarkers(data);
    }
}
