# API 設計書

## SVG 登録 API

### 概要

作成した SVG を登録する

### パス

`/v1/register`

### メソッド

- POST
  - JSON (Req/Res)

### パラメータ

| パラメータ名 | 型     | 内容       |
| ------------ | ------ | ---------- |
| svg          | string | svg の本体 |

#### リクエストサンプル

```JSON
{
  "svg": "<svg x=0 y=0 width=100 height=60 style="background-color: #ddd">
  <polygon points="50 10, 70 30, 50 50, 30 30" fill="#99f" />
</svg>"
}
```

## レスポンス

### 成功時

- ステータスコード:200

#### パラメータ

| パラメータ名 | 型     | 内容             |
| ------------ | ------ | ---------------- |
| code         | number | ステータスコード |
| message      | string | メッセージ       |
| Item         | array  | アイテム         |

#### Item オブジェクト

| パラメータ名 | 型     | 内容                 |
| ------------ | ------ | -------------------- |
| id           | string | イノる id ≒NFT の id |
| svgUrl       | string | svg の保存先の URL   |
| country      | number | 区画の番号           |
| pref         | number | 区画の番号           |
| city         | number | 区画の番号           |
| name         | number | 区画の番号(1－1－1)  |

#### レスポンスサンプル

```JSON
{
"code":200,
"mesage":"OK",
"Item":
}
```

## SVG 一覧取得用 API

```
type Item struct {
	svgUrl string
	country string
	pref string
	city string
	name string
	created_at time.Time
	id string // NFT を特定する id
}
```

### 概要

区画の SVG の一覧を取得する

### パス

`/v1/item/:country/:pref`

### メソッド

- GET
  - JSON (Req/Res)

### レスポンス

### 成功時

- ステータスコード:200

#### パラメータ

| パラメータ名 | 型     | 内容             |
| ------------ | ------ | ---------------- |
| code         | number | ステータスコード |
| message      | string | メッセージ       |
| Items        | array  | Item の一覧      |

#### Item オブジェクト

| パラメータ名 | 型     | 内容                 |
| ------------ | ------ | -------------------- |
| id           | string | イノる id ≒NFT の id |
| svgUrl       | string | svg の保存先の URL   |
| country      | number | 区画の番号           |
| pref         | number | 区画の番号           |
| city         | number | 区画の番号           |
| name         | number | 区画の番号(1－1－1)  |

#### レスポンスサンプル

```JSON
{
"code":200,
"mesage":"OK",
"Items":[
  {
  "inolId":"1234abcd",
  "svgUrl:"https//:hogehoge",
  "city":1
  .
  .
  .
  },
  {
  "inolId":"1234abcd",
  "svgUrl:"https//:hogehoge",
  "city":1
  .
  .
  .
  }
]
}
```

## キャンバス編集用の URL

### 概要

キャンバス編集用の URL を取得する

### パス

`/v1/canvas`

### メソッド

- GET?
  - JSON (Req/Res)

### パラメータ

| パラメータ名 | 型  | 内容 |
| ------------ | --- | ---- |

### レスポンス

### 成功時

- ステータスコード:200

#### パラメータ

| パラメータ名 | 型     | 内容                    |
| ------------ | ------ | ----------------------- |
| code         | number | ステータスコード        |
| message      | string | メッセージ              |
| canvasUrl    | string | 共同編集用の URL を返す |

#### レスポンスサンプル

```JSON
{
"code":200,
"mesage":"OK",
"svgUrl":"https//:new/1234abcd"
}
```

## SVG 単体取得用 API その 1

### 概要

SVG を 1 つだけ取得する.
country, pref, city のすべてを指定する.

### パス

`/v1/item/:country/:pref/:city`

### メソッド

- GET
  - JSON (Req/Res)

### レスポンス

### 成功時

- ステータスコード:200

#### パラメータ

| パラメータ名 | 型     | 内容             |
| ------------ | ------ | ---------------- |
| code         | number | ステータスコード |
| message      | string | メッセージ       |
| svgUrl       | string | svg 保存先の URL |

#### レスポンスサンプル

```JSON
{
"code":200,
"mesage":"OK",
"svgUrl":"https//:hogehoge"
}
```

## SVG 単体取得用 API その 2

### 概要

SVG を 1 つだけ取得する.
nft の id を指定する.

### パス

`/v1/item/:id`

### メソッド

- GET
  - JSON (Req/Res)

### パラメータ

| パラメータ名 | 型     | 内容                |
| ------------ | ------ | ------------------- |
| id           | string | イノる id≒NFT の id |

### レスポンス

### 成功時

- ステータスコード:200

#### パラメータ

| パラメータ名 | 型     | 内容                     |
| ------------ | ------ | ------------------------ |
| code         | number | ステータスコード         |
| message      | string | メッセージ               |
| svgUrl       | string | SVG が格納されている URL |

#### レスポンスサンプル

```JSON
{
"code":200,
"mesage":"OK",
"svgUrl":"https//:hogehoge"
}
```

## SVG 削除用 API

### 概要

如何わしい SVG を削除する

### パス

`/v1/delete`

### メソッド

- PATCH
  - JSON (Req/Res)

### パラメータ

| パラメータ名 | 型     | 内容      |
| ------------ | ------ | --------- |
| id           | string | イノる id |

#### リクエストサンプル

```JSON
{
  "id": "1234abcd"
}
```

### レスポンス

### 成功時

- ステータスコード:200

#### パラメータ

| パラメータ名 | 型     | 内容             |
| ------------ | ------ | ---------------- |
| code         | number | ステータスコード |
| message      | string | メッセージ       |

#### レスポンスサンプル

```JSON
{
"code":200,
"mesage":"DELETE SUCCES",
}
```
