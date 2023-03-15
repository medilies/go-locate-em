package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type databaseConfig struct {
	DbHost     string
	DbPort     string
	DbUser     string
	DbPassword string
	DbName     string
}

var dbConfig *databaseConfig

func InitDbConfig() {
	if dbConfig != nil {
		return
	}

	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %s", err)
	}

	dbConfig = &databaseConfig{
		DbHost:     os.Getenv("DB_HOST"),
		DbPort:     os.Getenv("DB_PORT"),
		DbUser:     os.Getenv("DB_USER"),
		DbPassword: os.Getenv("DB_PASSWORD"),
		DbName:     os.Getenv("DB_Name"),
	}
}

func GetDbConfig() *databaseConfig {
	if dbConfig == nil {
		InitDbConfig()
	}
	return dbConfig
}
