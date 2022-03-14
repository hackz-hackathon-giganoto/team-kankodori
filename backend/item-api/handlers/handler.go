package handlers

import (
	"fmt"
	"os"

	"github.com/Azure/azure-sdk-for-go/sdk/storage/azblob"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"

	"github.com/hackz-hackathon-giganoto/team-kankodori/backend/item-api/service"
)

var Db *sqlx.DB
var ContainerClient azblob.ContainerClient

type Handler struct {
	Service *service.Service
}

func NewHandler() *Handler {
	s := service.NewService()
	return &Handler{
		Service: s,
	}
}

func mustGetEnv(key string) string {
	v := os.Getenv(key)
	if v == "" {
		panic(fmt.Sprintf("you must set %s", key))
	}
	return v
}
