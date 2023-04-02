import basePath from "./basePath";

export default (apiPath:string, body:Record<string, any>, headers: Record<string, any> = {}) =>
    fetch(`${basePath}${apiPath}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            ...headers
        },
    });
