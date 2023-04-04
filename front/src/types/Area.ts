import GeoJson from "./GeoJson"

export default interface Area {
    id?: number
    name?: string|null
    perimeter: GeoJson
}
