package handlers

import (
	"fmt"

	"github.com/labstack/echo/v4"
	"github.com/pkg/errors"

	"github.com/hackz-hackathon-giganoto/team-kankodori/backend/item-api/service"
)

func (ctr *Handler) GetItem(c echo.Context) error {
	fmt.Println("GetEma")
	country := c.Param("country")
	pref := c.Param("pref")
	city := c.Param("city")

	i, err := service.GetItem(ctr.Db, country, pref, city)
	if err != nil {
		return errors.Wrapf(err, "failed to call getItem")
	}
	return c.JSON(200, i)
}
