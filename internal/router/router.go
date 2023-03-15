package router

import (
	"log"
	"net/http"

	"github.com/medilies/go-locate-em/internal/controllers"
)

type Router struct{}

var sc = &controllers.SearchController{}
var ac = &controllers.AreaController{}

func (Router) Boot(mux *http.ServeMux) {
	mux.HandleFunc("/", routingHandler)

	fs := http.FileServer(http.Dir("public"))
	mux.Handle("/public/", http.StripPrefix("/public/", fs))
}

func routingHandler(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path
	method := r.Method

	log.Println("  ", method, ": ", path)

	// TODO: first check if route is handled
	// TODO: make a list of routes [path, method, handler, middleware]

	if path == "/api/search" {
		sc.Search(w, r)
	} else if path == "/api/areas" {
		if method == http.MethodGet {
			ac.Index(w, r)
		} else if method == http.MethodPost {
			ac.Store(w, r)
		}
	}
}
