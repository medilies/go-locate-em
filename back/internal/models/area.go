package models

import (
	"database/sql"
	"fmt"
	"strings"

	"github.com/medilies/go-locate-em/internal/types"
)

type AreaModel struct {
	db          *sql.DB
	table       string
	columnsList []string
}

func NewAreaModel(db *sql.DB) *AreaModel {
	return &AreaModel{db, "areas", []string{"id", "name", "ST_AsGeoJSON(perimeter)"}}
}

func (m *AreaModel) All() ([]types.Area, error) {
	rows, err := m.db.Query(fmt.Sprintf("SELECT %s FROM %s", strings.Join(m.columnsList, ", "), m.table))
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var areas []types.Area
	for rows.Next() {
		var area types.Area
		err := rows.Scan(&area.Id, &area.Name, &area.Perimeter)
		if err != nil {
			return nil, err
		}
		areas = append(areas, area)
	}

	return areas, nil
}
