# GIS

## Longitude & Latitude

![longitude latitude on earth](https://geography.name/wp-content/uploads/2015/10/Lat_Long.webp)

![longitude latitude on flat map](https://i.pinimg.com/originals/59/0f/8d/590f8df285a96811609ac189bf1c6e4b.gif)

The longitude (x-coordinate) is usually specified before the latitude (y-coordinate) when defining the points of a geometry. This convention is followed for most types of geometries.

> However! Web mapping services like Google Maps and OpenStreetMap use the cartography convention of (latitude, longitude) for representing locations.

## Geographical objects

There are several types of geographical objects. Here are some common examples:

-   `Point`: A single point in space, represented by a pair of coordinates.
-   `LineString`: A sequence of points that form a continuous line.
-   `Polygon`: A closed shape defined by a sequence of points that form a boundary.
-   `MultiPoint`: A collection of points.
-   `MultiLineString`: A collection of LineStrings.
-   `MultiPolygon`: A collection of Polygons.
-   `GeometryCollection`: A collection of points, lines, polygons, or other geometry types.
-   `CircularString`: A sequence of points that form a curve.
-   `CompoundCurve`: A sequence of circular and/or straight line segments.
-   `CurvePolygon`: A polygon with a curved boundary, consisting of a Curve as the outer boundary and zero or more inner linear rings.

These types of geographic objects can be represented in different geospatial data formats such as `WKT`, `GeoJSON`, `Shapefile`, `GeoTIFF`, `KML`, and many others, which allow GIS (Geographic Information System) software to manipulate and analyze geographic data.

> A polygon can be composed of multiple closed shapes, as long as each individual shape is itself a valid polygon. However, these shapes would be considered as separate polygons, rather than a single polygon. In WKT notation, each separate polygon would be enclosed in its own set of parentheses

## WKT

Well Know Text (WKT): is a text-based format used to represent geometric objects in a standardized way, used in GIS and spatial databases to store spatial data.

### Examples

```js
POINT(30.2672 -97.7431)
LINESTRING(-117.345 33.123, -117.342 33.122, -117.341 33.119)
POLYGON((30 10, 40 40, 20 40, 10 20, 30 10))
MULTIPOINT((10 40), (40 30), (20 20), (30 10))
MULTILINESTRING((-10 -10, -20 -20, -10 -40), (10 10, 20 20, 10 40))
MULTIPOLYGON(((30 20, 45 40, 10 40, 30 20)),((15 5, 40 10, 10 20, 5 10, 15 5)))
GEOMETRYCOLLECTION(POINT(4 6), LINESTRING(4 6,7 10))
```

## GeoJSON

In a GeoJSON, there are a few required elements that must be included:

-   `type`: specifies the type of GeoJSON object.
-   `coordinates`: the coordinates of the geometry, which can be specified in various ways depending on the geometry type. For example, a Point is represented as an array of two or three numbers representing the longitude, latitude, and (optionally) elevation.
-   `properties`: an optional JSON object that can contain any additional data or attributes associated with the feature.

```json
{
    "type": "Feature",
    "geometry": {
        "type": "Point",
        "coordinates": [125.6, 10.1]
    },
    "properties": {
        "name": "My Point"
    }
}
```

### Examples

```json
{
    "type": "Point",
    "coordinates": [125.6, 10.1]
}
```

```json
{
    "type": "Polygon",
    "coordinates": [
        [
            [-117.13395690917969, 32.74285623633187],
            [-117.1397590637207, 32.74896580084244],
            [-117.13395690917969, 32.74285623633187]
        ],
        [
            [-117.1297369003296, 32.74705135382465],
            [-117.1321964263916, 32.7454077325676],
            [-117.1272325515747, 32.74505982640553],
            [-117.1297369003296, 32.74705135382465]
        ]
    ]
}
```

## SRID

SRID stands for Spatial Reference Identifier. It is a unique identifier that specifies the coordinate reference system (CRS) and projection information for a spatial data set.

In GIS (Geographic Information Systems), spatial data is represented as coordinates, which are often referenced to a particular CRS. The CRS defines how the coordinates are mapped to a specific location on the Earth's surface.

Different geographic locations use different CRSs, and SRID provides a standardized way to identify and reference a particular CRS. For example, the SRID 4326 is commonly used to represent data in the WGS84 CRS, which is used by the Global Positioning System (GPS).

By using SRIDs, spatial data can be accurately located and projected onto a map or other geographic representation, even if the data was collected in a different geographic location or using a different coordinate system.

## SQL

See the supported types by MariaDB [here](https://mariadb.com/kb/en/geometry-types/)

The basic geometry type is `GEOMETRY`. But the type can be more specific ([`POINT`](https://mariadb.com/kb/en/point/), `LINESTRING`,[`POLYGON`](https://mariadb.com/kb/en/polygon/), `MULTIPOINT`, `MULTILINESTRING`, [`MULTIPOLYGON`](https://mariadb.com/kb/en/multipolygon/), `GEOMETRYCOLLECTION`, `GEOMETRY`)

> `geom` typically refers to a spatial column that stores geometric data.

### Picked examples

```sql
CREATE TABLE gis_point (g POINT);

INSERT INTO gis_point VALUES (PointFromText('POINT(10 10)'));
```

```sql
CREATE TABLE gis_polygon (g POLYGON);

INSERT INTO gis_polygon VALUES
    (PolygonFromText('POLYGON((10 10,20 10,20 20,10 20,10 10))')),
    (PolyFromText('POLYGON((0 0,50 0,50 50,0 50,0 0), (10 10,20 10,20 20,10 20,10 10))'));
```

```sql
CREATE TABLE gis_geometry (g GEOMETRY);

INSERT into gis_geometry SELECT * FROM gis_point;
INSERT into gis_geometry SELECT * FROM gis_line;
INSERT into gis_geometry SELECT * FROM gis_polygon;
INSERT into gis_geometry SELECT * FROM gis_multi_point;
INSERT into gis_geometry SELECT * FROM gis_multi_line;
INSERT into gis_geometry SELECT * FROM gis_multi_polygon;
INSERT into gis_geometry SELECT * FROM gis_geometrycollection;
```

### Functions

#### ST_GeomFromText (WKT -> Geom)

Constructs a geometry value of any type using its WKT representation and SRID.

`GeomFromText()`, `GeometryFromText()`, `ST_GeomFromText()` and `ST_GeometryFromText()` are all synonyms.

```sql
SELECT ST_GeomFromText('POLYGON((8.06 37.56,2.61 37.56,4.13 36.01,6.85 36.01,8.06 37.56))')
-- POLYGON((8.06 37.56,2.61 37.56,4.13 36.01,6.85 36.01,8.06 37.56))
```

#### ST_AsText (Geom -> WKT)

`ST_AsText(),` `AsText()`, `ST_AsWKT()` and `AsWKT()` are all synonyms.

#### ST_GeomFromGeoJSON (GeoJSON -> Geom)

```SQL
SELECT ST_GeomFromGeoJSON('{"type":"Polygon","coordinates":[[[8.06,37.56],[2.61,37.56],[4.13,36.01],[6.85,36.01],[8.06,37.56]]]}')
-- POLYGON((8.06 37.56,2.61 37.56,4.13 36.01,6.85 36.01,8.06 37.56))
```

#### ST_AsGeoJSON (Geom -> GeoJSON)

```SQL
SELECT ST_AsGeoJSON(ST_GeomFromText('POLYGON((8.06 37.56,2.61 37.56,4.13 36.01,6.85 36.01,8.06 37.56))'));
-- {"type":"Polygon","coordinates":[[[8.06,37.56],[2.61,37.56],[4.13,36.01],[6.85,36.01],[8.06,37.56]]]}
```

### Distance

#### ST_DISTANCE_SPHERE

Calculates the great-circle distance between two points on a sphere or spheroid, using the Haversine formula. This function is typically used for geodetic calculations in applications that require high accuracy, such as navigation or surveying.

```sql
SELECT
    ST_DISTANCE_SPHERE(
        POINT(-0.32170480372414134, 35.85398240387264),
        POINT(-0.6368148560996869, 35.70035747269707)
    )
-- 33164.40908920633
```

> the `ST_DISTANCE_SPHERE` function is typically slower than the `ST_Distance` function, because it involves more complex calculations.

## References

https://www.distance.to/

https://aaronfrancis.com/2021/efficient-distance-querying-in-my-sql

https://tighten.com/insights/a-mysql-distance-function-you-should-know-about/

https://medium.com/spartner/the-best-way-to-locate-in-mysql-8-e47a59892443

https://youtu.be/M4lR_Va97cQ?list=PLCRMIe5FDPseVvwzRiCQBmNOVUIZSSkP8

https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula

https://www.youtube.com/watch?v=OcUKFIjhKu0

https://www.youtube.com/watch?v=iRhSAR3ldTw
