package router

import (
	"net/http"

	"github.com/medilies/go-locate-em/internal/controllers"
)

type Router struct{}

var sc = &controllers.SearchController{}
var ac = &controllers.AreaController{}

func (Router) RegisterRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/api/search", sc.Search)
	mux.HandleFunc("/api/areas", ac.Index)

	fs := http.FileServer(http.Dir("public"))
	mux.Handle("/public/", http.StripPrefix("/public/", fs))
}
