import get from "./helpers/get";

export default (query) => {
    return get(`/search?query=${query}`)
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.error(error));
};
