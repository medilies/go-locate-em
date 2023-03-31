export default (query) => {
    return fetch(`http://127.0.0.1:8000/api/search?query=${query}`)
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.error(error));
};
