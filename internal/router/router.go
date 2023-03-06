package router

import (
	"net/http"

	"github.com/medilies/go-locate-em/internal/controllers"
)

type Router struct{}

var hc = &controllers.HomeController{}

func (Router) RegisterRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/", hc.Index)
}
