import Area from "../types/Area";
import post from "./helpers/post";

export default (geoJson:Area) => {
    return post("/areas", geoJson)
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.error(error));
};
