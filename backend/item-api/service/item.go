package service

import (
	"context"
	"fmt"
	"hash/fnv"
	"os"
	"time"

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

func CreateNewItem(id, country, pref, city string) *Item {
	return &Item{
		Id:      id,
		Country: country,
		Pref:    pref,
		City:    city,
		Name:    fmt.Sprintf("%s-%s-%s", country, pref, city),
	}

}

func (s *Service) GetItem(country, pref, city string) (*Item, error) {
	item := Item{}
	sql := fmt.Sprintf("SELECT * FROM %s WHERE country = $1 AND pref = $2 AND city = $3", TABLE_NAME)
	if err := s.Db.QueryRowx(sql, country, pref, city).StructScan(&item); err != nil {
		fmt.Println(err)
		return nil, errors.Wrapf(err, "cannnot connect SQL")
	}
	return &item, nil
}

func (s *Service) CreateItem(createItemRequest *CreateItemRequest) (*Item, error) {
	// ('test-item-1111', 'https://cdn.shopify.com/s/files/1/0496/1029/files/Freesample.svg', 5,5,5, '5-5-5', NOW())
	ctx := context.TODO()
	item := CreateNewItem("some-id", "6", "6", "6")

	var err error
	item.SvgUrl, err = s.UploadSVGToBlob(ctx, item.Id, createItemRequest.Svg)
	fmt.Println("item.SvgUrl, err = s.UploadSVGToBlob(ctx, item.Id, createItemRequest.Svg)")
	if err != nil {
		return nil, errors.Wrap(err, "failed to upload svg to blob storage")
	}

	sql := fmt.Sprintf("INSERT INTO %s values (:id, :svg_url, :country, :pref, :city, :name, NOW());", TABLE_NAME)
	_, err = s.Db.NamedExec(sql, item)
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

func mustGetEnv(key string) string {
	v := os.Getenv(key)
	if v == "" {
		panic(fmt.Sprintf("you must set %s", key))
	}
	return v
}
