package router

import (
	"fmt"
	"log"
	"net/http"
	"reflect"
)

func routingHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	path := r.URL.Path
	method := r.Method

	log.Println("  ", method, ": ", path) // TODO: log response on same line

	if method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	matchedRoute := matchRoute(path, method)

	if matchedRoute != nil {
		controllerName := matchedRoute.Controller
		actionName := matchedRoute.Action

		// TODO: refactor >
		controller, ok := controllersMap[controllerName]
		if !ok {
			http.Error(w, fmt.Sprintf("Controller not found: %s", controllerName), http.StatusInternalServerError)
			return
		}

		method := reflect.ValueOf(controller).MethodByName(actionName)
		if !method.IsValid() {
			http.Error(w, fmt.Sprintf("Method not found: %s.%s", controllerName, actionName), http.StatusInternalServerError)
			return
		}
		// <

		args := []reflect.Value{reflect.ValueOf(w), reflect.ValueOf(r)}
		method.Call(args)
	} else {
		http.NotFound(w, r)
	}
}

func matchRoute(path string, method string) *Route {
	for _, route := range routes {
		if route.Path == path && route.Method == method {
			return &route
		}
	}

	return nil
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "*")
}
