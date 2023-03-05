package main

import (
	"fmt"
	"net/http"

	"github.com/medilies/go-locate-em/internal/controllers"
)

func main() {
	mux := http.NewServeMux()

	hc := &controllers.HomeController{}

	mux.HandleFunc("/", hc.Index)

	fmt.Println("Linstenning on port 8000, see: http://127.0.0.1:8000")
	http.ListenAndServe(":8000", mux)
}
