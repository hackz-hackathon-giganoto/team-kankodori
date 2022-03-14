package service

type TransactionAccepted struct {
	TxHash string `json:"txHash"`
}

type NonFungibleMetadata struct {
	ItemInfo Item `json:"itemInfo"`
}

type Transaction struct {
	Height    uint64 `json:"height"`
	TxHash    string `json:"txhash"`
	Index     int    `json:"index"`
	Code      int    `json:"code"`
	Codespace string `json:"codespace"`
	Data      string `json:"data"`
	Info      string `json:"info"`
	Logs      []Log  `json:"logs"`
	GasWanted uint64 `json:"gasWanted"`
	GasUsed   uint64 `json:"gasUsed"`
	Tx        Tx     `json:"tx"`
	Timestamp uint64 `json:"timestamp"`
}

type Log struct {
	MsgIndex int     `json:"msg_index"`
	Success  bool    `json:"success"`
	Log      string  `json:"log"`
	Events   []Event `json:"events"`
}

type Event struct {
	Type       string      `json:"type"`
	Attributes []Attribute `json:"attributes"`
}

type Attribute struct {
	Key   string `json:"key"`
	Value string `json:"value"`
}

type Tx struct {
	Type  string  `json:"type"`
	Value TxValue `json:"value"`
}

type TxValue struct {
	Message    []Message   `json:"msg"`
	Fee        Fee         `json:"fee"`
	Signatures []Signature `json:"signatures"`
	Memo       string      `json:"memo"`
}

type Message struct {
	Type  string      `json:"type"`
	Value interface{} `json:"value"`
}

type Fee struct {
	Amount []Amount `json:"amount"`
	Gas    int      `json:"gas"`
}

type Amount struct {
	Amount int    `json:"amount"`
	Denom  string `json:"denom"`
}

type Signature struct {
	PubKey    PubKey `json:"pubKey"`
	Signature string `json:"signature"`
}

type PubKey struct {
	Type  string `json:"type"`
	Value string `json:"value"`
}
