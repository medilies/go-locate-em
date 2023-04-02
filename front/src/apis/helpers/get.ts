import basePath from "./basePath";

export default (apiPath:string, headers:Record<string, any> = {}) =>
    fetch(`${basePath}${apiPath}`, {
        method: "GET",
        headers:{
            "Content-Type": "application/json",
            ...headers
        },
    });
