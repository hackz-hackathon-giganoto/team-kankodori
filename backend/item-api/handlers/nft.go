package handlers

import (
	"net/http"

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
	tx, err := ctr.Service.CreateNonFungible(createNFTRequest.Name)
	if err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, tx)
}

type GetTransactionRequest struct {
	TxHash string `json:"tx_hash"`
}

func (ctr *Handler) GetTransaction(c echo.Context) error {
	txHash := c.QueryParam("txhash")
	tx, err := ctr.Service.GetTransaction(txHash)
	if err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, tx)
}

type MintNFTRequest struct {
	UserID string `json:"userId"`
}

func (ctr *Handler) MintNFTById(c echo.Context) error {
	nftId := c.Param("id")
	req := new(MintNFTRequest)
	if err := c.Bind(req); err != nil {
		return c.String(http.StatusBadRequest, err.Error())
	}
	if req.UserID == "" {
		return c.String(http.StatusBadRequest, "userId is null")
	}

	c.Logger().Info("MintNFTRequest", req)
	_, err := ctr.Service.MintNonFungible(req.UserID, nftId)
	if err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}
	return c.NoContent(http.StatusOK)
}
