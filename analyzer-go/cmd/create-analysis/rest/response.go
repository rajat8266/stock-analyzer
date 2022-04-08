package rest

import (
	"encoding/json"
	"io"
	"log"
)

// JSONResp is the structure our client side expects
type JSONResp struct {
	Meta     `json:"meta"`
	Response interface{} `json:"response,omitempty"`
}

// Response replicates the response format
type Response struct {
	Items interface{} `json:"items"`
	Count int64       `json:"count"`
}

// Response replicates the response format
type ResponseTypeAhead struct {
	Items      interface{} `json:"items"`
	Pagination interface{} `json:"pagination"`
}

// TypeAheadResponse is the response format the typeahead plugin expects
type TypeAheadResponse struct {
	Results    interface{} `json:"results"`
	Pagination interface{} `json:"pagination"`
}

// Pagination is the response format the paginator plugin expects
type Pagination struct {
	More bool `json:"more"`
}

// Meta holds the response code, Error and Warning messages, if any
type Meta struct {
	Code    int32  `json:"code"`
	Error   string `json:"error"`
	Warning string `json:"warning"`
}

// ValidationError is used for validation error displayed on the UI
type ValidationError struct {
	Field string `json:"field"`
	Msg   string `json:"msg"`
}

// OKResponse takes an io.Writer (http.ResponseWriter implements it),
func OKResponse(w io.Writer, payload interface{}) {
	ret := JSONResp{
		Response: payload,
	}
	ret.Meta.Code = 200
	err := json.NewEncoder(w).Encode(ret)
	if err != nil {
		log.Printf("Error Encoding : %v", err)
		ErrorResponse(w, "Our engineers are looking into this error.", 500)
	}
}

// ErrorResponse takes an io.Writer (http.ResponseWriter implements it),
// err message and code and sends them to the writer
func ErrorResponse(w io.Writer, errMsg string, errCode int32) {
	m := Meta{
		Code:  errCode,
		Error: errMsg,
	}
	ret := JSONResp{
		Meta: m,
	}
	err := json.NewEncoder(w).Encode(ret)
	if err != nil {
		log.Printf("Error Encoding : %v", err)
	}
}

// ValidationErrorResponse takes an io.Writer (http.ResponseWriter implements it),
// err message and code and sends them to the writer
func ValidationErrorResponse(w io.Writer, errMsg string, errors []ValidationError) {
	m := Meta{
		Code:  400,
		Error: errMsg,
	}
	ret := JSONResp{
		Meta:     m,
		Response: errors,
	}
	err := json.NewEncoder(w).Encode(ret)
	if err != nil {
		log.Printf("Error Encoding : %v", err)
	}
}
