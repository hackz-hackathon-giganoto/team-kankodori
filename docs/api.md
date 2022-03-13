# API 設計書

## SVG 登録 API

### 概要

作成した Item を登録する

### パス

`/v1/item`

### メソッド

- POST
  - json (Req/Res)

### パラメータ

| パラメータ名 | 型     | 内容       |
| ------------ | ------ | ---------- |
| svg          | string | svg の本体 |

#### リクエストサンプル

```json
{
  "svg": "<svg x=0 y=0 width=100 height=60 style=\"background-color: #ddd\"><polygon points=\"50 10, 70 30, 50 50, 30 30\" fill=\"#99f\" /></svg>"
}
```

## レスポンス

### 成功時

- ステータスコード:200

#### パラメータ

| パラメータ名 | 型    | 内容     |
| ------------ | ----- | -------- |
| Items        | array | アイテム |

#### Item オブジェクト

| パラメータ名 | 型     | 内容                |
| ------------ | ------ | ------------------- |
| id           | string | Item id ≒NFT の id  |
| svg_url      | string | svg の保存先の URL  |
| country      | number | 区画の番号(1－×－×) |
| pref         | number | 区画の番号(×－1－×) |
| city         | number | 区画の番号(×－×-1)  |
| name         | string | 区画の番号(1－1－1) |

#### レスポンスサンプル

```json
{
  "Item": {
    "id": "1234abcd",
    "svg_url": "https://hoghoge",
    "country": 1,
    "pref": 1,
    "city": 1,
    "name": "1-1-1"
  }
}
```

## Page の SVG リスト取得用 API

### 概要

区画の Item のリストを取得する

### パス

`/v1/items/:country/:pref`

### メソッド

- GET
  - json (Req/Res)

### レスポンス

### 成功時

- ステータスコード:200

#### パラメータ

| パラメータ名 | 型    | 内容          |
| ------------ | ----- | ------------- |
| items        | array | item のリスト |

#### レスポンスサンプル

```json
{
  "items": [
    {
      "id": "1234abcd",
      "svg_url": "https://hoghoge",
      "country": 1,
      "pref": 1,
      "city": 1,
      "name": "1-1-1"
    },
    {
      "id": "1234abcd",
      "svg_url": "https://hoghoge",
      "country": 1,
      "pref": 1,
      "city": 1,
      "name": "1-1-1"
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

- POST
  - json (Req/Res)

### パラメータ

| パラメータ名 | 型  | 内容 |
| ------------ | --- | ---- |

### レスポンス

### 成功時

- ステータスコード:200

#### パラメータ

| パラメータ名 | 型     | 内容                    |
| ------------ | ------ | ----------------------- |
| canvas_url   | string | 共同編集用の URL を返す |

#### レスポンスサンプル

```json
{
  "canvas_url": "https//:new/1234abcd"
}
```

## Item 単体取得用 API その 1

### 概要

Item を 1 つだけ取得する.
country, pref, city のすべてを指定する.

### パス

`/v1/item/:country/:pref/:city`

### メソッド

- GET
  - json (Req/Res)

### レスポンス

### 成功時

- ステータスコード:200

#### パラメータ

| パラメータ名 | 型    | 内容              |
| ------------ | ----- | ----------------- |
| item         | array | item オブジェクト |

#### レスポンスサンプル

```json
{
  "id": "1234abcd",
  "svg_url": "https://hoghoge",
  "country": 1,
  "pref": 1,
  "city": 1,
  "name": "1-1-1"
}
```

## Item 単体取得用 API その 2

### 概要

Item を 1 つだけ取得する.
nft の id を指定する.

### パス

`/v1/item/:id`

### メソッド

- GET
  - json (Req/Res)

### パラメータ

| パラメータ名 | 型     | 内容              |
| ------------ | ------ | ----------------- |
| id           | string | Item id≒NFT の id |

### レスポンス

### 成功時

- ステータスコード:200

#### パラメータ

| パラメータ名 | 型    | 内容                |
| ------------ | ----- | ------------------- |
| item         | array | item のオブジェクト |

#### レスポンスサンプル

```json
{
  "id": "1234abcd",
  "svg_url": "https://hoghoge",
  "country": 1,
  "pref": 1,
  "city": 1,
  "name": "1-1-1"
}
```

## Item 非公開用 API

### 概要

不適切な SVG を非公開にするリクエスト

### パス

`/v1/hiderequest`

### メソッド

- PUT
  - json (Req/Res)

### パラメータ

| パラメータ名 | 型     | 内容       |
| ------------ | ------ | ---------- |
| id           | string | item の id |

#### リクエストサンプル

```json
{
  "id": "1234abcd"
}
```

### レスポンス

### 成功時

- ステータスコード:200

#### パラメータ

| パラメータ名 | 型  | 内容 |
| ------------ | --- | ---- |
