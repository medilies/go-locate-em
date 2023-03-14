package controllers

import (
	"encoding/json"
	"fmt"
	"io"
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

type RequestBody struct {
	Perimeter json.RawMessage `json:"perimeter"`
}

func (AreaController) Store(w http.ResponseWriter, r *http.Request) {
	// Read the request body
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Error reading request body", http.StatusInternalServerError)
		return
	}

	// Parse the JSON string into a Request struct
	var req RequestBody
	err = json.Unmarshal(body, &req)
	if err != nil {
		fmt.Println(err)
		return
	}

	// Prepare the insert statement with placeholders
	stmt, err := database.GetDB().Prepare("INSERT INTO areas (name, perimeter) VALUES (?, ST_GeomFromGeoJSON(?))")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	_, err = stmt.Exec("polygon.Name", req.Perimeter)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode("yo")
}
