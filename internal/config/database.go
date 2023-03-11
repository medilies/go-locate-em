package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type DatabaseConfig struct {
	DbHost     string
	DbPort     string
	DbUser     string
	DbPassword string
	DbName     string
}

var DbConfig *DatabaseConfig

func InitDatabaseConfig() {
	if DbConfig != nil {
		return
	}

	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %s", err)
	}

	DbConfig = &DatabaseConfig{
		DbHost:     os.Getenv("DB_HOST"),
		DbPort:     os.Getenv("DB_PORT"),
		DbUser:     os.Getenv("DB_USER"),
		DbPassword: os.Getenv("DB_PASSWORD"),
		DbName:     os.Getenv("DB_Name"),
	}
}

func GetDatabaseConfig() *DatabaseConfig {
	if DbConfig == nil {
		InitDatabaseConfig()
	}
	return DbConfig
}
