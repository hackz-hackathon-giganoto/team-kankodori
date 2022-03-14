package service

import (
	"bytes"
	"context"
	"encoding/base64"
	"fmt"
	"os"

	"github.com/Azure/azure-sdk-for-go/sdk/azcore/streaming"
	"github.com/Azure/azure-sdk-for-go/sdk/storage/azblob"
	"github.com/jmoiron/sqlx"
	"github.com/pkg/errors"
)

const CONTAINER_NAME = "item-test-test"

var (
	Db              *sqlx.DB
	ContainerClient azblob.ContainerClient
)

type CreateItemRequest struct {
	// Svg contains base64-decoded svg image
	Svg    string `json:"svg"`
	UserId string `json:"user_id"`
}

type Service struct {
	Db              *sqlx.DB
	ContainerClient *azblob.ContainerClient
}

func NewService() *Service {
	return &Service{
		Db:              Db,
		ContainerClient: &ContainerClient,
	}
}

func init() {
	var err error
	databaseUrl := os.Getenv("DATABASE_URL")
	if databaseUrl == "" {
		panic("DATABASE_URL must be specified.")
	}

	Db, err = sqlx.Open("postgres", databaseUrl)
	if err != nil {
		panic(err)
	}

	// From the Azure portal, get your Storage account's name and account key.
	accountName := mustGetEnv("AZURE_STORAGE_ACCOUNT_NAME")
	accountKey := mustGetEnv("AZURE_STORAGE_ACCOUNT_ACCESS_KEY")

	cred, err := azblob.NewSharedKeyCredential(accountName, accountKey)
	if err != nil {
		panic(err)
	}
	// Open up a service client.
	// You'll need to specify a service URL, which for blob endpoints usually makes up the syntax http(s)://<account>.blob.core.windows.net/
	service, err := azblob.NewServiceClientWithSharedKey(fmt.Sprintf("https://%s.blob.core.windows.net/", accountName), cred, nil)
	if err != nil {
		panic(err)
	}

	// All operations in the Azure Blob Storage SDK for Go operate on a context.Context, allowing you to control cancellation/timeout.
	// ctx := context.Background() // This example has no expiry.

	// This example showcases several common operations to help you get started, such as:

	// ===== 1. Creating a container =====

	// First, branch off of the service client and create a container client.
	ContainerClient = service.NewContainerClient(CONTAINER_NAME)
}

// UploadSVGToBlob returns URL which can public access
func (s *Service) UploadSVGToBlob(ctx context.Context, id, svg string) (string, error) {
	// ===== 2. Uploading/downloading a block blob =====
	// We'll specify our data up-front, rather than reading a file for simplicity's sake.

	// Branch off of the container into a block blob client
	filename := id + ".svg"
	blockBlob := s.ContainerClient.NewBlockBlobClient(filename)
	fmt.Println("blockBlob := s.ContainerClient.NewBlockBlobClient(id")

	data, err := base64.StdEncoding.DecodeString(svg)
	if err != nil {
		return "", errors.Wrap(err, "failed to decode base64 encoded svg image")
	}

	// Upload data to the block blob
	if _, err = blockBlob.Upload(ctx, streaming.NopCloser(bytes.NewReader(data)), nil); err != nil {
		return "", errors.Wrap(err, "failed to upload")
	}

	upload_path := fmt.Sprintf("https://inolstorageaccount.blob.core.windows.net/%s/%s", CONTAINER_NAME, filename)
	return upload_path, nil
}
