package controllers

import (
	"database/sql"
	"encoding/json"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

type AreaController struct{}

func (AreaController) Index(w http.ResponseWriter, r *http.Request) {
	states, err := getAreas()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(states)
}

type Area struct {
	Id        int    `json:"id"`
	Name      string `json:"name"`
	Perimeter string `json:"perimeter"`
}

func getAreas() ([]Area, error) {
	db, err := sql.Open("mysql", "root:root@tcp(127.0.0.1:3306)/go_locate_em")
	if err != nil {
		return nil, err
	}
	defer db.Close()

	rows, err := db.Query("SELECT id, name, AsText(perimeter) FROM tunisia_states")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var states []Area
	for rows.Next() {
		var state Area
		err = rows.Scan(&state.Id, &state.Name, &state.Perimeter)
		if err != nil {
			return nil, err
		}
		states = append(states, state)
	}

	return states, nil
}
