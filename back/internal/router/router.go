package router

import (
	"net/http"
)

type Router struct{}

type Route struct {
	Path       string
	Method     string
	Controller string
	Action     string
}

var routes = []Route{}

func (Router) Boot(mux *http.ServeMux) {
	mux.HandleFunc("/", routingHandler)

	register()

	fs := http.FileServer(http.Dir("public"))
	mux.Handle("/public/", http.StripPrefix("/public/", fs))
}
