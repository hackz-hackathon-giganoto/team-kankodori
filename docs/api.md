# API 設計書

## SVG 登録 API

### 概要

作成した SVG を登録する

### パス

`/api/regist`

### メソッド

- POST
  - JSON (Req/Res)

### パラメータ

| パラメータ名 | 型     | 内容                |
| ------------ | ------ | ------------------- |
| svg          | string | `<svg>を渡す</svg>` |

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

#### レスポンスサンプル

```JSON
{
"code":200,
"mesage":"OK"
}
```

## SVG 一覧取得用 API

### 概要

区画の SVG の一覧を取得する

### パス

`/api/svg一覧欲しい`

### メソッド

- GET
  - JSON (Req/Res)

#### ファイルオブジェクト

| パラメータ名 | 型     | 内容       |
| ------------ | ------ | ---------- |
| id           | number | 区画の番号 |

#### リクエストサンプル

```JSON
{
  "id": "1234567890abcedf"
}
```

### レスポンス

### 成功時

- ステータスコード:200

#### パラメータ

| パラメータ名 | 型     | 内容                  |
| ------------ | ------ | --------------------- |
| code         | number | ステータスコード      |
| message      | string | メッセージ            |
| svgs         | array  | 区画にある SVG の一覧 |

#### SVG オブジェクト

| パラメータ名 | 型     | 内容       |
| ------------ | ------ | ---------- |
| id           | string | イノる id  |
| svg          | string | svg の実体 |

#### レスポンスサンプル

```JSON
{
"code":200,
"mesage":"OK",
"svgs":[
{
"inolId":"1234abcd",
"svg:"<svg x=0 y=0 width=100 height=60 style="background-color: #ddd">
  <polygon points="50 10, 70 30, 50 50, 30 30" fill="#99f" />
</svg>"
},
{
"inolId":"1234abcd",
"svg:"<svg x=0 y=0 width=100 height=60 style="background-color: #ddd">
  <polygon points="50 10, 70 30, 50 50, 30 30" fill="#99f" />
</svg>"
}...
]
}
```

## SVG 単体取得用 API

### 概要

SVG を 1 つだけ取得する

### パス

`/api/svg1つだけ欲しい`

### メソッド

- GET
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

| パラメータ名 | 型     | 内容                  |
| ------------ | ------ | --------------------- |
| code         | number | ステータスコード      |
| message      | string | メッセージ            |
| svgs         | array  | 区画にある SVG の一覧 |

#### SVG オブジェクト

| パラメータ名 | 型     | 内容       |
| ------------ | ------ | ---------- |
| id           | string | イノる id  |
| svg          | string | svg の実体 |

#### レスポンスサンプル

```JSON
{
"code":200,
"mesage":"OK",
"svg:"<svg x=0 y=0 width=100 height=60 style="background-color: #ddd">
  <polygon points="50 10, 70 30, 50 50, 30 30" fill="#99f" />
</svg>"
}
```

## SVG 削除用 API

### 概要

如何わしい SVG を削除する

### パス

`/api/delete`

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
