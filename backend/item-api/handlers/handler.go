package handlers

import (
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

var Db *sqlx.DB

type Handler struct {
	Db *sqlx.DB
}

func init() {
	var err error
	// Db, err = sql.Open("postgres", "user=dbuser dbname=defaultdb password=password sslmode=disable host=cockroachdb-public.cockroachdb port=26257")
	Db, err = sqlx.Open("postgres", "postgres://dbuser:password@cockroachdb-public.cockroachdb:26257/defaultdb?sslmode=require")
	if err != nil {
		panic(err)
	}
}

func NewHandler() *Handler {
	return &Handler{
		Db: Db,
	}
}
