# item-api tables

item-api は現在 Postgresql を利用しています

plain text で管理していますが、item table しか存在しないため 負荷ではないという判断をしています
これから table が増えれば gorm など、 ORM を利用することも検討

## item table

```sql
CREATE TABLE item_test (
	id STRING NOT NULL,
	svg_url VARCHAR(100) NOT NULL,
	country INTEGER,
	pref INTEGER,
	city INTEGER,
	name VARCHAR(30),
    owner STRING,
	created_at TIMESTAMPTZ
);
```

### go struct
```go
type Item struct {
	Id        string    `db:"id" json:"id"` // NFT の id と同じ
	SvgUrl    string    `db:"svg_url" json:"svg_url"`
	Country   string    `db:"country" json:"country"`
	Pref      string    `db:"pref" json:"pref"`
	City      string    `db:"city" json:"city"`
	Name      string    `db:"name" json:"name"`
	Owner     string    `db:"owner" json:"owner"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`
}
```
