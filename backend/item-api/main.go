package main

import (
	"os"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	"github.com/hackz-hackathon-giganoto/team-kankodori/backend/item-api/handlers"
)

func main() {
	// インスタンスを作成
	e := echo.New()

	// ミドルウェアを設定
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// ルートを設定
	handler := handlers.NewHandler()
	v0 := e.Group("/v0")
	{
		// items := v0.Group("/items")
		// {
		// 	items.Get("/:country/:pref")
		// }
		item := v0.Group("/item")
		{
			// item.Get("/:id", )
			item.GET("/:country/:pref/:city", handler.GetItem)
		}
	}

	e.GET("/", func(c echo.Context) error {
		return c.String(200, "hello from gin")
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	e.Logger.Fatal(e.Start(":" + port))
}
