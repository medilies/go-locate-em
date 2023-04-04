package types

import "encoding/json"

type Area struct {
	Id        int             `json:"id"`
	Name      string          `json:"name"`
	Perimeter json.RawMessage `json:"perimeter"`
}

// TODO: perimeter -> geo [type, coordinates]
