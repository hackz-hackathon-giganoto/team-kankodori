package handlers

import (
	"net/http"
	"strings"

	"github.com/labstack/echo/v4"
	"github.com/pkg/errors"

	"github.com/hackz-hackathon-giganoto/team-kankodori/backend/item-api/service"
)

func (ctr *Handler) GetItem(c echo.Context) error {
	c.Logger().Info("func (ctr *Handler) GetItem(c echo.Context)")
	country := c.Param("country")
	pref := c.Param("pref")
	city := c.Param("city")
	name := c.Param("name")

	if name != "" {
		c.Logger().Infof("specified name: %s\n", name)
		names := strings.Split(name, "-")
		if len(names) != 3 {
			return errors.New("id must be like x-y-z")
		}
		country = names[0]
		pref = names[1]
		city = names[2]
	}

	i, err := ctr.Service.GetItem(country, pref, city)
	if err != nil {
		return errors.Wrapf(err, "failed to call getItem")
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
		return c.String(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(200, item)
}
