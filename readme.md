## WKT

Well Know Text (WKT): is a text-based format used to represent geometric objects, such as points, lines, and polygons in a standardized way, used in geographic information systems (GIS) and spatial databases to store and share spatial data.

The longitude (x-coordinate) is usually specified before the latitude (y-coordinate) when defining the points of a geometry. This convention is followed for most types of geometries.

> However! Web mapping services like Google Maps and OpenStreetMap use the cartography convention of (latitude, longitude) for representing locations.

![longitude latitude on earth](https://geography.name/wp-content/uploads/2015/10/Lat_Long.webp)

![longitude latitude on flat map](https://i.pinimg.com/originals/59/0f/8d/590f8df285a96811609ac189bf1c6e4b.gif)

There are several types of geographical objects that can be represented using Well-Known Text (WKT) or other geospatial data formats. Here are some common examples:

-   Point: A single point in space, represented by a pair of coordinates.
-   LineString: A sequence of points that form a continuous line.
-   Polygon: A closed shape defined by a sequence of points that form a boundary.
-   MultiPoint: A collection of points.
-   MultiLineString: A collection of LineStrings.
-   MultiPolygon: A collection of Polygons.
-   GeometryCollection: A collection of points, lines, polygons, or other geometry types.
-   CircularString: A sequence of points that form a curve.
-   CompoundCurve: A sequence of circular and/or straight line segments.
-   CurvePolygon: A polygon with a curved boundary, consisting of a Curve as the outer boundary and zero or more inner linear rings.

```js
POINT(30.2672 -97.7431)
LINESTRING(-117.345 33.123, -117.342 33.122, -117.341 33.119)
POLYGON((30 10, 40 40, 20 40, 10 20, 30 10))
MULTIPOINT((10 40), (40 30), (20 20), (30 10))
MULTILINESTRING((-10 -10, -20 -20, -10 -40), (10 10, 20 20, 10 40))
MULTIPOLYGON(((30 20, 45 40, 10 40, 30 20)),((15 5, 40 10, 10 20, 5 10, 15 5)))
GEOMETRYCOLLECTION(POINT(4 6), LINESTRING(4 6,7 10))
```
