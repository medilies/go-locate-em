package database

import (
	"database/sql"
	"fmt"
	"sync"

	_ "github.com/go-sql-driver/mysql"
	"github.com/medilies/go-locate-em/internal/config"
)

var (
	db   *sql.DB
	once sync.Once
)

func initDB() {
	databaseConfig := config.GetDbConfig()

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s",
		databaseConfig.DbUser,
		databaseConfig.DbPassword,
		databaseConfig.DbHost,
		databaseConfig.DbPort,
		databaseConfig.DbName)

	var err error
	db, err = sql.Open("mysql", connStr)
	if err != nil {
		panic(err)
	}

	err = db.Ping()
	if err != nil {
		panic(err)
	}
}

func GetDB() *sql.DB {
	once.Do(func() {
		initDB()
	})
	return db
}
