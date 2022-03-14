package main

import (
	"os"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/labstack/gommon/log"

	"github.com/hackz-hackathon-giganoto/team-kankodori/backend/item-api/handlers"
)

func main() {
	// インスタンスを作成
	e := echo.New()

	// set mode
	if os.Getenv("DEBUG") != "" {
		e.Logger.SetLevel(log.DEBUG)
	}

	// ミドルウェアを設定
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// ルートを設定
	handler := handlers.NewHandler()
	v1 := e.Group("/v1")
	{
		item := v1.Group("/item")
		{
			item.GET("/:id", handler.GetItemById)
			item.GET("/:country/:pref/:city", handler.GetItem)
			item.POST("/", handler.CreateItem)
		}

		items := v1.Group("/items")
		{
			items.GET("/:country/:pref", handler.ListItemsByCity)
		}
	}

	e.GET("/ping", func(c echo.Context) error {
		return c.String(200, "pong")
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	e.Logger.Fatal(e.Start(":" + port))
}
