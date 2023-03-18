import { MapComponent } from "./src/MapComponent";
import "./style.css";

const map = new MapComponent("map");

document.getElementById("search-btn").addEventListener("click", () => {
    let query = document.getElementById("search-box").value;

    fetch(`http://127.0.0.1:8000/api/search?query=${query}`)
        .then((response) => response.json())
        .then((data) => {
            map.displaySearchResult(data);
        })
        .catch((error) => console.error(error));
});
