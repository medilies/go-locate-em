package controllers

import (
	"encoding/json"
	"io"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/medilies/go-locate-em/internal/models"
	"github.com/medilies/go-locate-em/internal/models/database"
	"github.com/medilies/go-locate-em/internal/types"
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

	if len(states) == 0 {
		// TODO: find a better way
		w.Write([]byte("[]"))
		return
	}
	json.NewEncoder(w).Encode(states)
}

func (AreaController) Store(w http.ResponseWriter, r *http.Request) {
	// Read the request body
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Error reading request body", http.StatusInternalServerError)
		return
	}

	// Parse the JSON string into a Request struct
	var req types.Area
	err = json.Unmarshal(body, &req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Prepare the insert statement with placeholders
	stmt, err := database.GetDB().Prepare("INSERT INTO areas (name, perimeter) VALUES (?, ST_GeomFromGeoJSON(?))")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// TODO: use a real name
	result, err := stmt.Exec(req.Name, req.Perimeter)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// TODO: use ID in reponse
	_, err = result.LastInsertId()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
