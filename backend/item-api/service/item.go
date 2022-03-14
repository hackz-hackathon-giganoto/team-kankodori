package service

import (
	"fmt"
	"hash/fnv"
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
	item := Item{}
	sql := fmt.Sprintf("SELECT * FROM %s WHERE country = $1 AND pref = $2 AND city = $3", TABLE_NAME)
	if err := db.QueryRowx(sql, country, pref, city).StructScan(&item); err != nil {
		fmt.Println(err)
		return nil, errors.Wrapf(err, "cannnot connect SQL")
	}
	return &item, nil
}

func CreateItem(db *sqlx.DB, item *Item) (*Item, error) {
	// ('test-item-1111', 'https://cdn.shopify.com/s/files/1/0496/1029/files/Freesample.svg', 5,5,5, '5-5-5', NOW())
	item.Id = createId(item.Name)
	item.SvgUrl = "https://cdn.shopify.com/s/files/1/0496/1029/files/Freesample.svg"

	sql := fmt.Sprintf("INSERT INTO %s values (:id, :svg_url, :country, :pref, :city, :name, NOW());", TABLE_NAME)
	_, err := db.NamedExec(sql, item)
	if err != nil {
		return nil, errors.Wrap(err, "failed to insert data")
	}
	return item, nil
}

func createId(s string) string {
	h := fnv.New32()
	h.Write([]byte(s))
	return fmt.Sprintf("%x", h.Sum(nil))
}
