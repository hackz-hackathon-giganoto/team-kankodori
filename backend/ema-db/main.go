package main

import (
	"github.com/hackz-hackathon-giganoto/team-kankodori/backend/ema-db/handlers"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	// インスタンスを作成
	e := echo.New()

	// ミドルウェアを設定
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// ルートを設定
	e.GET("/", handlers.GetEma) // ローカル環境の場合、http://localhost:1323/ にGETアクセスされるとhelloハンドラーを実行する
	// サーバーをポート番号1323で起動
	e.Logger.Fatal(e.Start(":8080"))
}
