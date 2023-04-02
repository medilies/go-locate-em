package router

import (
	"github.com/medilies/go-locate-em/internal/controllers"
)

var controllersMap = map[string]interface{}{
	"SearchController": &controllers.SearchController{},
	"AreaController":   &controllers.AreaController{},
}

func register() {
	get("/api/search", "SearchController", "Search")

	get("/api/areas", "AreaController", "Index")
	post("/api/areas", "AreaController", "Store")
}
