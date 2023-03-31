import "./style.css";

import { MapComponent } from "./src/MapComponent";

import searchPositions from "./src/apis/searchPositions";

const map = new MapComponent("map");

document.getElementById("search-btn").addEventListener("click", () => {
    let query = document.getElementById("search-box").value;

    searchPositions(query).then((data) => map.displaySearchResult(data));
});
