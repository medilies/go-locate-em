package controllers

import (
	"encoding/json"
	"net/http"
)

type SearchController struct{}

type Location struct {
	Name      string  `json:"name"`
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
}

type LocationList struct {
	Locations []Location `json:"locations"`
}

func (SearchController) Search(w http.ResponseWriter, r *http.Request) {
	// Create a list of Location structs with example data
	locations := []Location{
		{"Algiers", 36.7538, 3.0588},
		{"Oran", 35.6969, -0.6331},
		{"Constantine", 36.3650, 6.6147},
		{"Annaba", 36.9086, 7.7660},
		{"Batna", 35.5555, 6.1745},
		{"Blida", 36.4700, 2.8300},
		{"Setif", 36.1922, 5.4137},
		{"Sidi Bel Abbes", 35.1908, -0.6296},
		{"Biskra", 34.8476, 5.7256},
		{"Tebessa", 35.4050, 8.1242},
	}

	// Marshal the data to JSON
	data, err := json.Marshal(locations)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Set the Content-Type header to application/json
	w.Header().Set("Content-Type", "application/json")

	// Write the JSON response
	w.Write(data)
}
