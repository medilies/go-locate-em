package models

import (
	"database/sql"
	"fmt"
	"strings"
)

type AreaModel struct {
	db          *sql.DB
	table       string
	columnsList []string
}

func NewAreaModel(db *sql.DB) *AreaModel {
	return &AreaModel{db, "tunisia_states", []string{"id", "name", "AsText(perimeter)"}}
}

type Area struct {
	Id        int    `json:"id"`
	Name      string `json:"name"`
	Perimeter string `json:"perimeter"`
}

func (m *AreaModel) All() ([]Area, error) {
	rows, err := m.db.Query(fmt.Sprintf("SELECT %s FROM %s", strings.Join(m.columnsList, ", "), m.table))
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var areas []Area
	for rows.Next() {
		var area Area
		err := rows.Scan(&area.Id, &area.Name, &area.Perimeter)
		if err != nil {
			return nil, err
		}
		areas = append(areas, area)
	}

	return areas, nil
}
