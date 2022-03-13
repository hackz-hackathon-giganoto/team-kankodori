package handlers

import (
	"fmt"
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

	i, err := service.GetItem(ctr.Db, country, pref, city)
	if err != nil {
		return errors.Wrapf(err, "failed to call getItem")
	}
	return c.JSON(200, i)
}

func (ctr *Handler) CreateItem(c echo.Context) error {
	c.Logger().Info("func (ctr *Handler) CreateItem(c echo.Context)")
	item := service.Item{}
	c.Bind(&item)
	item.Country = c.Param("country")
	item.Pref = c.Param("pref")
	item.City = c.Param("city")
	item.Name = fmt.Sprintf("%s-%s-%s", item.Country, item.Pref, item.City)

	_, err := service.CreateItem(ctr.Db, &item)
	if err != nil {
		return c.String(30000, err.Error())
	}
	return c.JSON(200, item)
}
