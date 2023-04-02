package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type applicationConfig struct {
	Name string
	URL  string
}

var appConfig *applicationConfig

func InitAppConfig() {
	if appConfig != nil {
		return
	}

	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %s", err)
	}

	appConfig = &applicationConfig{
		Name: os.Getenv("NAME"),
		URL:  os.Getenv("URL"),
	}
}

func GetAppConfig() *applicationConfig {
	if appConfig == nil {
		InitAppConfig()
	}
	return appConfig
}
