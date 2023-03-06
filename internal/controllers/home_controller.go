package controllers

import "net/http"

type HomeController struct{}

func (HomeController) Index(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Welcome"))
}
