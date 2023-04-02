package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/medilies/go-locate-em/internal/config"
	"github.com/medilies/go-locate-em/internal/models/database"
	"github.com/medilies/go-locate-em/internal/router"
)

func main() {
	config.GetDbConfig()
	appConfig := config.GetAppConfig()

	db := database.GetDB()
	defer db.Close()

	mux := http.NewServeMux()
	router.Router{}.Boot(mux)

	fmt.Printf("Linstenning on, see: http://%s \n", appConfig.URL)

	err := http.ListenAndServe(appConfig.URL, mux)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
