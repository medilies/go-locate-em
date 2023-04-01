import post from "./helpers/post";

export default (geoJson) => {
    // send a POST request to the API with the GeoJSON data
    return post("/areas", JSON.stringify(geoJson), {
        "Content-Type": "application/json",
    })
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.error(error));
};
