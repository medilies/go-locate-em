import get from "./helpers/get";

export default () => {
    return get("/areas")
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.error(error));
};
