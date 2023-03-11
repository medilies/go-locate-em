package models

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"strings"
)

type AreaModel struct {
	db          *sql.DB
	table       string
	columnsList []string
}

func NewAreaModel(db *sql.DB) *AreaModel {
	return &AreaModel{db, "areas", []string{"id", "name", "ST_AsGeoJSON(perimeter)"}}
}

type Area struct {
	Id        int        `json:"id"`
	Name      string     `json:"name"`
	Perimeter *Perimeter `json:"perimeter"`
}

type Perimeter struct {
	Type        string        `json:"type"`
	Coordinates [][][]float64 `json:"coordinates"`
}

func (p *Perimeter) Scan(value interface{}) error {
	bytes, ok := value.([]byte)
	if !ok {
		return fmt.Errorf("failed to parse Perimeter field")
	}
	return json.Unmarshal(bytes, p)
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
