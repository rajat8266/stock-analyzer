package main

import (
	"back-end/cmd/create-analysis/db"
	"back-end/cmd/create-analysis/process"

	"github.com/gorilla/pat"
)

func Routes(r *pat.Router, srv *db.Server) {
	r.Get("/go-api/save-yahoo-api-data", process.SaveHistoricalData)
	r.Get("/go-api/fetch-stock-data", process.FetchStocksData)
}
