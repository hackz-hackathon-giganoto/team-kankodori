package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"

	"github.com/hackz-hackathon-giganoto/team-kankodori/backend/item-api/service"
)

func (ctr *Handler) GetItem(c echo.Context) error {
	c.Logger().Info("func (ctr *Handler) GetItem(c echo.Context)")
	country := c.Param("country")
	pref := c.Param("pref")
	city := c.Param("city")

	i, err := ctr.Service.GetItem(country, pref, city)
	if err != nil {
		if err != service.ERR_NO_RESULT {
			c.Logger().Errorf("failed to call GetItem: %v", err.Error())
			return c.String(http.StatusInternalServerError, err.Error())
		}
		return c.NoContent(http.StatusNotFound)
	}
	return c.JSON(200, i)
}

func (ctr *Handler) GetItemById(c echo.Context) error {
	c.Logger().Info("func (ctr *Handler) GetItemById(c echo.Context)")
	id := c.Param("id")
	c.Logger().Info("requested id:", id)

	i, err := ctr.Service.GetItemById(id)
	if err != nil {
		if err != service.ERR_NO_RESULT {
			c.Logger().Errorf("failed to call GetItemById: %v", err.Error())
			return c.String(http.StatusInternalServerError, err.Error())
		}
		return c.NoContent(http.StatusNotFound)
	}
	return c.JSON(200, i)
}

func (ctr *Handler) CreateItem(c echo.Context) error {
	c.Logger().Info("func (ctr *Handler) CreateItem(c echo.Context)")
	createItemRequest := new(service.CreateItemRequest)
	if err := c.Bind(createItemRequest); err != nil {
		return c.String(http.StatusBadRequest, err.Error())
	}
	item, err := ctr.Service.CreateItem(createItemRequest)
	if err != nil {
		c.Logger().Error(err.Error())
		return c.String(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(200, item)
}
