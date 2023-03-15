package main

import (
	"fmt"
	"net/http"

	"github.com/medilies/go-locate-em/internal/models/database"
	"github.com/medilies/go-locate-em/internal/router"
)

func main() {
	db := database.GetDB()

	defer db.Close()

	mux := http.NewServeMux()
	router.Router{}.RegisterRoutes(mux)

	fmt.Println("Linstenning on port 8000, see: http://127.0.0.1:8000")
	http.ListenAndServe("127.0.0.1:8000", mux)
}
