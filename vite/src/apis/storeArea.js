export default (geoJson) => {
    let data = {
        perimeter: {
            // TODO: directly use geoJson
            type: geoJson.geometry.type,
            coordinates: geoJson.geometry.coordinates,
        },
    };

    // send a POST request to the API with the GeoJSON data
    return fetch("http://127.0.0.1:8000/api/areas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.error(error));
};
