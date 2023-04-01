import basePath from "./basePath";

export default (apiPath, body, headers = {}) =>
    fetch(`${basePath}${apiPath}`, {
        method: "POST",
        body,
        headers,
    });
