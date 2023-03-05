package main

import (
	"fmt"
	"net/http"

	"github.com/medilies/go-locate-em/internal/controllers"
)

func main() {
	hc := &controllers.HomeController{}

	http.HandleFunc("/", hc.Index)

	fmt.Println("Linstenning on http://127.0.0.1:8000")
	http.ListenAndServe(":8000", nil)
}
