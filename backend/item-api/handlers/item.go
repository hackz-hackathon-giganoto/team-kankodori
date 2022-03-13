package handlers

import (
	"fmt"
	"strings"

	"github.com/labstack/echo/v4"
	"github.com/pkg/errors"

	"github.com/hackz-hackathon-giganoto/team-kankodori/backend/item-api/service"
)

func (ctr *Handler) GetItem(c echo.Context) error {
	fmt.Println("func (ctr *Handler) GetItem(c echo.Context)")
	country := c.Param("country")
	pref := c.Param("pref")
	city := c.Param("city")

	name := c.Param("name")

	if name != "" {
		fmt.Printf("specified name: %s\n", name)
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
