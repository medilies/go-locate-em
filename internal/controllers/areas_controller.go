package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/medilies/go-locate-em/internal/models"
	"github.com/medilies/go-locate-em/internal/models/database"
)

type AreaController struct{}

var areaModel = models.NewAreaModel(database.GetDB())

func (AreaController) Index(w http.ResponseWriter, r *http.Request) {
	states, err := areaModel.All()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(states)
}

type Perimeter struct {
	Type        string        `json:"type"`
	Coordinates [][][]float64 `json:"coordinates"`
}

type RequestBody struct {
	Perimeter Perimeter `json:"perimeter"`
}

func (AreaController) Store(w http.ResponseWriter, r *http.Request) {
	var requestBody RequestBody
	err := json.NewDecoder(r.Body).Decode(&requestBody)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// convert the polygon coordinates to WKT string
	wkt := "POLYGON(("
	for _, point := range requestBody.Perimeter.Coordinates[0] {
		wkt += fmt.Sprintf("%f %f,", point[0], point[1])
	}
	// remove the last comma and close the polygon
	wkt = wkt[:len(wkt)-1] + "))"

	// Prepare the insert statement with placeholders
	stmt, err := database.GetDB().Prepare("INSERT INTO areas (name, perimeter) VALUES (?, ST_PolygonFromText(?))")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	_, err = stmt.Exec("polygon.Name", wkt)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode("yo")
}
