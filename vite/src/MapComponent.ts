import getAreas from "./apis/getAreas";

import { Map as LeafletMap } from "./mapProviders/leaflet/Map";

import Area from "./types/Area";
import Position from "./types/Position";

export class MapComponent {
    id:string
    map:LeafletMap

    constructor(id:string) {
        this.id = id;
        this.map = new LeafletMap(this.id);

        this.onMount();
    }

    onMount() {
        getAreas().then((data) => {
            data.forEach((area:Area) => {
                if (
                    area.perimeter.type === "Polygon" ||
                    area.perimeter.type === "MultiPolygon"
                ) {
                    this.map.addArea(area.perimeter);
                }
            });
        });
    }

    displaySearchResult(data:Position[]) {
        this.map.drawMarkers(data);
    }
}
