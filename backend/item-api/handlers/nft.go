package handlers

import (
	"net/http"

	"github.com/hackz-hackathon-giganoto/team-kankodori/backend/item-api/service"
	"github.com/labstack/echo/v4"
)

type CreateNFTRequest struct {
	Name string `json:"name"`
}

func (ctr *Handler) CreateNFT(c echo.Context) error {
	createNFTRequest := new(CreateNFTRequest)
	if err := c.Bind(createNFTRequest); err != nil {
		return c.String(http.StatusBadRequest, err.Error())
	}
	c.Logger().Debugf("CreateNFT: %v", createNFTRequest)
	c.Logger().Debug(c.ParamValues())
	tx, err := service.CreateNonFungible(createNFTRequest.Name)
	if err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}

	// for {
	// 	txRef, err := service.GetTransaction(tx.TxHash)
	// 	if err == nil {
	// 		break
	// 	}
	// }

	// tx, _ := service.CreateNonFungible()
	return c.JSON(http.StatusOK, tx)
}

type GetTransactionRequest struct {
	TxHash string `json:"tx_hash"`
}

func (ctr *Handler) GetTransaction(c echo.Context) error {
	txHash := c.QueryParam("txhash")
	tx, err := service.GetTransaction(txHash)
	if err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, tx)
}
