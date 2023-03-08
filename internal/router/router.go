package router

import (
	"net/http"

	"github.com/medilies/go-locate-em/internal/controllers"
)

type Router struct{}

var sc = &controllers.SearchController{}

func (Router) RegisterRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/api/search", sc.Search)

	fs := http.FileServer(http.Dir("static"))
	mux.Handle("/public/", http.StripPrefix("/public/", fs))
}
