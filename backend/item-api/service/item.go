package service

import (
	"fmt"
	"time"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"github.com/pkg/errors"
)

type Item struct {
	Id        string // NFT を特定する id
	SvgUrl    string
	Country   string
	Pref      string
	City      string
	Name      string
	CreatedAt time.Time
}

func GetItem(db *sqlx.DB, country, pref, city string) (*Item, error) {
	fmt.Println("GetItem")
	item := Item{}
	if err := db.QueryRowx("SELECT * FROM items WHERE country = $1 AND pref = $2 AND city = $3", country, pref, city).StructScan(&item); err != nil {
		fmt.Println(err)
		return nil, errors.Wrapf(err, "cannnot connect SQL")
	}
	return &item, nil
}
