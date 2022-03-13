package service

import (
	"fmt"
	"time"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"github.com/pkg/errors"
)

const TABLE_NAME = "item_test"

type Item struct {
	Id        string    `db:"id" json:"id"` // NFT を特定する id
	SvgUrl    string    `db:"svg_url" json:"svg_url"`
	Country   string    `db:"country" json:"country"`
	Pref      string    `db:"pref" json:"pref"`
	City      string    `db:"city" json:"city"`
	Name      string    `db:"name" json:"name"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`
}

func GetItem(db *sqlx.DB, country, pref, city string) (*Item, error) {
	fmt.Println("GetItem")
	item := Item{}
	sql := fmt.Sprintf("SELECT * FROM %s WHERE country = $1 AND pref = $2 AND city = $3", TABLE_NAME)
	if err := db.QueryRowx(sql, country, pref, city).StructScan(&item); err != nil {
		fmt.Println(err)
		return nil, errors.Wrapf(err, "cannnot connect SQL")
	}
	return &item, nil
}
