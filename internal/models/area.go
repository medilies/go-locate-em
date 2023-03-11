package models

import "github.com/medilies/go-locate-em/internal/models/database"

type Area struct {
	Id        int    `json:"id"`
	Name      string `json:"name"`
	Perimeter string `json:"perimeter"`
}

func All() ([]Area, error) {
	db := database.GetDB()

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
