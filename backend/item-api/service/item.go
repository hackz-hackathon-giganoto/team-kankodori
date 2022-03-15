package service

import (
	"context"
	"fmt"
	"hash/fnv"
	"math/rand"
	"os"
	"strconv"
	"time"

	"github.com/labstack/gommon/log"
	_ "github.com/lib/pq"
	"github.com/pkg/errors"
)

const TABLE_NAME = "item_test"

var ERR_NO_RESULT = errors.New("no rows in result set")

type Item struct {
	Id        string    `db:"id" json:"id"` // NFT を特定する id
	SvgUrl    string    `db:"svg_url" json:"svg_url"`
	Country   string    `db:"country" json:"country"`
	Pref      string    `db:"pref" json:"pref"`
	City      string    `db:"city" json:"city"`
	Name      string    `db:"name" json:"name"`
	Owner     string    `db:"owner" json:"owner"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`
}

func CreateNewItem(id, userId string) *Item {
	country := 1 + rand.Intn(5)
	pref := 1 + rand.Intn(5)
	city := 1 + rand.Intn(5)
	return &Item{
		Id:      id,
		Country: strconv.Itoa(country),
		Pref:    strconv.Itoa(pref),
		City:    strconv.Itoa(city),
		Name:    id,
		Owner:   userId,
	}

}

func (s *Service) GetItem(country, pref, city string) (*Item, error) {
	item := Item{}
	sql := fmt.Sprintf("SELECT * FROM %s WHERE country = $1 AND pref = $2 AND city = $3", TABLE_NAME)
	if err := s.Db.QueryRowx(sql, country, pref, city).StructScan(&item); err != nil {
		if err.Error() != "sql: no rows in result set" {
			return nil, errors.Wrapf(err, "unexpected result")
		}
		return nil, ERR_NO_RESULT
	}
	return &item, nil
}

func (s *Service) GetItemById(id string) (*Item, error) {
	item := Item{}
	sql := fmt.Sprintf("SELECT * FROM %s WHERE id = $1", TABLE_NAME)
	err := s.Db.QueryRowx(sql, id).StructScan(&item)
	if err != nil {
		if err.Error() != "sql: no rows in result set" {
			return nil, errors.Wrapf(err, "unexpected result")
		}
		return nil, ERR_NO_RESULT
	}
	return &item, nil
}

func (s *Service) ListItemsByCountryAndPref(country, pref string) (*[]Item, error) {
	sql := fmt.Sprintf("SELECT * FROM %s WHERE country = $1 AND pref = $2", TABLE_NAME)
	rows, err := s.Db.Queryx(sql, country, pref)
	if err != nil {
		if err.Error() != "sql: no rows in result set" {
			return nil, errors.Wrapf(err, "unexpected result")
		}
		return nil, ERR_NO_RESULT
	}

	var itemList []Item
	var item Item
	for rows.Next() {
		err := rows.StructScan(&item)
		if err != nil {
			return nil, errors.Wrap(err, "failed to call StructScan")
		}
		log.Debugf("item: %v\n", item)
		itemList = append(itemList, item)
	}
	return &itemList, nil
}

func (s *Service) CreateItem(createItemRequest *CreateItemRequest) (*Item, error) {
	ctx := context.TODO()

	tmpId := generateId()
	log.Infof("create NFT: %s", tmpId)
	tx, err := s.CreateNonFungible(tmpId)
	if err != nil {
		return nil, errors.Wrap(err, "failed to create NFT")
	}

	var id string
	for {
		transaction, err := s.GetTransaction(tx.TxHash)
		if err != nil {
			return nil, errors.Wrap(err, "failed to get Transaction")
		}
		log.Debug("transaction", transaction)
		id = getAttributeFromTx(transaction, "token_type") // jq -r '.logs[0].events[0].attributes[] | select(.key == "token_type") |.value'
		if id == "" {
			time.Sleep(1 * time.Second)
			continue
		}
		break
	}

	log.Infof("token_type: %v", id)
	svgUrl, err := s.UploadSVGToBlob(ctx, id, createItemRequest.Svg)
	if err != nil {
		return nil, errors.Wrap(err, "failed to upload svg to blob storage")
	}

	// generate new place each loop to find empty place
	// TODO: find better algorithm?
	for {
		item := CreateNewItem(id, createItemRequest.UserId)
		item.SvgUrl = svgUrl

		log.Infof("Item Created: %v\n", item)
		sql := fmt.Sprintf("INSERT INTO %s values (:id, :svg_url, :country, :pref, :city, :name, NOW(), :owner);", TABLE_NAME)
		_, err = s.Db.NamedExec(sql, item)
		if err == nil {
			return item, nil
		}
		if err.Error() == "pq: duplicate key value violates unique constraint \"item_test_id_key\"" {
			log.Infof("item_test_id_key should be unique, retry...")
			// continue loop...
			continue
		}
		log.Errorf("unexpected error: %v\n", err)
		return nil, errors.Wrap(err, "failed to create new Item")
	}
}

func mustGetEnv(key string) string {
	v := os.Getenv(key)
	if v == "" {
		panic(fmt.Sprintf("you must set %s", key))
	}
	return v
}

// TODO: must be replaced other logic
func generateId() string {
	h := fnv.New32()
	h.Write([]byte(time.Now().String()))
	return fmt.Sprintf("%x", h.Sum(nil))
}

func getAttributeFromTx(tx *Transaction, key string) string {
	if tx.Logs != nil {
		if tx.Logs[0].Events != nil {
			if tx.Logs[0].Events[0].Attributes != nil {
				log.Debug("Attributes: %v", tx.Logs[0].Events[0].Attributes)
				for _, at := range tx.Logs[0].Events[0].Attributes {
					if at.Key == key {
						log.Debugf("found %s: %s", at.Key, at.Value)
						return at.Value
					}
				}
				return ""
			}
		}
	}
	return ""
}
