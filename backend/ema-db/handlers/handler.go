package handlers

import (
	"database/sql"
	"fmt"

	"github.com/labstack/echo/v4"
	_ "github.com/lib/pq"
	"github.com/pkg/errors"
)

type Ema struct {
	Id  string
	Ema string
}

var Db *sql.DB

func init() {
	var err error
	// Db, err = sql.Open("postgres", "user=dbuser dbname=defaultdb password=password sslmode=disable host=cockroachdb-public.cockroachdb port=26257")
	Db, err = sql.Open("postgres", "postgres://dbuser:password@cockroachdb-public.cockroachdb:26257/defaultdb?sslmode=require")
	if err != nil {
		panic(err)
	}
}

func GetEma(c echo.Context) error {
	fmt.Println("GetEma")
	ema := Ema{}
	if err := Db.QueryRow("select id, ema from ema_test limit 1").Scan(&ema.Id, &ema.Ema); err != nil {
		fmt.Println(err)
		return errors.Wrapf(err, "cannnot connect SQL")
	}
	fmt.Println(ema)
	return c.String(200, "aaa")
}
