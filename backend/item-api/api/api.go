package api

import (
	"bytes"
	"crypto/hmac"
	"crypto/sha512"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"io/ioutil"
	"math/rand"
	"net/http"
	"os"
	"sort"
	"strconv"
	"strings"
)

func CallAPI(path, method string, query map[string]string, params map[string]interface{}) ([]byte, error) {
	client := http.Client{}
	var body io.Reader
	queryStr := ""
	if method == "POST" {
		jsonParams, _ := json.Marshal(params)
		body = bytes.NewReader(jsonParams)
	}
	if query != nil {
		prefix := "?"
		for k, v := range query {
			queryStr += fmt.Sprintf("%s%s=%s", prefix, k, v)
			prefix = "&"
		}
	}

	req, err := http.NewRequest(method, "https://test-api.blockchain.line.me"+path+queryStr, body)
	if err != nil {
		return nil, err
	}

	timestamp, err := GetServerTime()

	if err != nil {
		return nil, err
	}

	nonce := makeNonce(8)

	sig := getSignature(nonce, timestamp, method, path, queryStr, params)

	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("service-api-key", os.Getenv("LINE_BV_SERVICE_API_KEY"))
	req.Header.Add("signature", sig)
	req.Header.Add("nonce", nonce)
	req.Header.Add("timestamp", timestamp)

	resp, err := client.Do(req)

	if err != nil {
		return nil, err
	}

	apiResult, err := ioutil.ReadAll(resp.Body)

	type response struct {
		ResponseTime  uint64      `json:"responseTime"`
		StatusCode    int         `json:"statusCode"`
		StatusMessage string      `json:"statusMessage"`
		ResponseData  interface{} `json:"responseData"`
	}

	unmarshalResult := response{}
	err = json.Unmarshal(apiResult, &unmarshalResult)

	if resp.StatusCode < 200 || resp.StatusCode > 299 {
		return nil, fmt.Errorf("invalid API response, path: %s, response: %s(%d %s)", path, resp.Status, unmarshalResult.StatusCode, unmarshalResult.StatusMessage)
	}

	if err != nil {
		return nil, err
	}

	if unmarshalResult.StatusCode >= 1000 && unmarshalResult.StatusCode <= 1999 {
		return json.Marshal(unmarshalResult.ResponseData)
	}
	return nil, errors.New(fmt.Sprintf("%d: %s", unmarshalResult.StatusCode, unmarshalResult.StatusMessage))
}

func makeNonce(length int) string {
	result := make([]byte, 0)
	charset := "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvxwyz0123456789"
	for i := 0; i < length; i++ {
		n := rand.Intn(len(charset))
		result = append(result, charset[n])
	}

	return string(result)
}

func getSignature(nonce, timestamp, method, path string, query string, params map[string]interface{}) string {
	msg := nonce + timestamp + method + path + query
	prefix := "?"
	if len(query) > 0 {
		prefix = "&"
	}

	if params != nil {
		paramMap := make(map[string]string)
		parseParams(paramMap, "", params)

		sortable := make([]string, 0)

		for k, _ := range paramMap {
			sortable = append(sortable, k)
		}

		sort.Slice(sortable, func(i, j int) bool {
			return strings.Compare(sortable[i], sortable[j]) < 0
		})

		for _, k := range sortable {
			msg += fmt.Sprintf("%s%s=%s", prefix, k, paramMap[k])
			prefix = "&"
		}
	}

	hash := hmac.New(sha512.New, []byte(os.Getenv("LINE_BV_SERVICE_API_SECRET")))
	hash.Write([]byte(msg))

	return base64.StdEncoding.EncodeToString(hash.Sum(nil))
}

func parseParams(result map[string]string, key string, params interface{}) {
	if mp, ok := params.(map[string]interface{}); ok {
		for k, v := range mp {
			newKey := fmt.Sprintf("%s.%s", key, k)
			if len(key) == 0 {
				newKey = k
			}
			parseParams(result, newKey, v)
		}
		return
	}

	result[key] = fmt.Sprint(params)
}

func GetServerTime() (string, error) {
	client := http.Client{}
	//  LBDAPIEndpoint
	req, err := http.NewRequest("GET", "https://test-api.blockchain.line.me/v1/time", nil)

	if err != nil {
		return "", err
	}

	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("service-api-key", os.Getenv("LINE_BC_API_KEY"))

	resp, err := client.Do(req)

	if err != nil {
		return "", err
	}

	body, err := ioutil.ReadAll(resp.Body)

	if err != nil {
		return "", err
	}

	type timeResult struct {
		ResponseTime uint64 `json:"responseTime"`
	}

	result := timeResult{}
	if err := json.Unmarshal(body, &result); err != nil {
		return "", err
	}
	return strconv.FormatUint(result.ResponseTime, 10), nil

}
