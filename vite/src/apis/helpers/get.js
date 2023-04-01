import basePath from "./basePath";

export default (apiPath, headers = {}) =>
    fetch(`${basePath}${apiPath}`, {
        method: "GET",
        headers,
    });
