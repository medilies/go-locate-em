package controllers

import (
	"encoding/json"
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
