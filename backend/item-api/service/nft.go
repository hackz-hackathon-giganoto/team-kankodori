package service

import (
	"encoding/json"
	"fmt"

	"github.com/hackz-hackathon-giganoto/team-kankodori/backend/item-api/api"
)

func CreateNonFungible(name, contractID string) (*TransactionAccepted, error) {
	path := fmt.Sprintf("/v1/item-tokens/%s/non-fungibles/", contractID)

	params := map[string]interface{}{
		"name":         name,
		"ownerAddress": mustGetEnv("WALLET_ADDRESS"),
		"ownerSecret":  mustGetEnv("WALLET_SECRET"),
	}

	apiResult, err := api.CallAPI(path, "POST", nil, params)
	if err != nil {
		return nil, err
	}

	txAccepted := &TransactionAccepted{}

	if err := json.Unmarshal(apiResult, txAccepted); err != nil {
		return nil, err
	}

	return txAccepted, nil
}
