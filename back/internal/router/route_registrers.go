package router

import "net/http"

func get(path string, controller string, action string) {
	route := Route{Path: path, Method: http.MethodGet, Controller: controller, Action: action}
	routes = append(routes, route)
}

func post(path string, controller string, action string) {
	route := Route{Path: path, Method: http.MethodPost, Controller: controller, Action: action}
	routes = append(routes, route)
}

func put(path string, controller string, action string) {
	route := Route{Path: path, Method: http.MethodPut, Controller: controller, Action: action}
	routes = append(routes, route)
}

func delete(path string, controller string, action string) {
	route := Route{Path: path, Method: http.MethodDelete, Controller: controller, Action: action}
	routes = append(routes, route)
}

// TODO: prefix wrapper
// TODO: middleware wrapper
