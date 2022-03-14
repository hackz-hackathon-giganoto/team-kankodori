package handlers

import (
	"os"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

var Db *sqlx.DB

type Handler struct {
	Db *sqlx.DB
}

func init() {
	var err error
	databaseUrl := os.Getenv("DATABASE_URL")
	if databaseUrl == "" {
		panic("DATABASE_URL must be specified.")
	}

	Db, err = sqlx.Open("postgres", databaseUrl)
	if err != nil {
		panic(err)
	}
}

func NewHandler() *Handler {
	return &Handler{
		Db: Db,
	}
}
