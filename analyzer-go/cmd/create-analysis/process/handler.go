package process

import (
	"context"
	"net/http"
	"strconv"
	"strings"
	"time"

	"back-end/cmd/create-analysis/db"
	"back-end/cmd/create-analysis/models"
	"back-end/cmd/create-analysis/parser"
	"back-end/cmd/create-analysis/rest"
	companies "back-end/cmd/create-analysis/sp500"
	fetch "back-end/cmd/create-analysis/yahoo-data"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type ChartFormattedData struct {
	Highs     []float64 `json:"highs"`
	Lows      []float64 `json:"lows"`
	Opens     []float64 `json:"opens"`
	Closes    []float64 `json:"closes"`
	TradeDate []string  `json:"trade_date"`
}

func SaveHistoricalData(w http.ResponseWriter, r *http.Request) {

	database, err := db.DB(r.Context(), w)
	if err != nil {
		rest.ErrorResponse(w, "Failed to connect database", 500)
	}

	var stocksHistoryCollection = database.Collection(new(models.Stock).CollectionName())
	var uniqueStocksCollection = database.Collection(new(models.UniqueStocks).CollectionName())

	// YAHOO BLACKLISTS IP IF API HITS THEIR THRESHOLD.

	// stocks := strings.Split(companies.TopCompanies, "\n")

	// for _, stock := range stocks {
	// 	filename := "/home/magic/Downloads/testing-fucking/stocks-analysis/data/" + stock + ".csv"
	// 	api := "https://query1.finance.yahoo.com/v7/finance/download/" + stock + "?period1=1617566863&period2=1649102863&interval=1d&events=history&includeAdjustedClose=true"
	// 	err = fetch.DownloadFileFromYahoo(filename, api)
	// 	if err != nil {
	// 		log.Printf("Error downloading files from Yahoo %v", err)
	// 	}
	// }

	var stocksData []interface{}

	stocks := strings.Split(companies.TopCompanies, "\n")
	err = SaveUniqueStockNames(stocks, uniqueStocksCollection)
	if err != nil {
		rest.ErrorResponse(w, "Failed to save unique stocks in collection", 500)
	}

	err = ResetCollection(stocksHistoryCollection)
	if err != nil {
		rest.ErrorResponse(w, "Failed to reset collection", 500)
	}

	for _, stock := range stocks {
		filepath := "/home/magic/Downloads/sample-project-2020/stocks-analysis/stocks-data/" + stock + ".csv"

		records, err := fetch.ReadCsvFile(filepath)

		if err == nil {

			// Saving in Database
			for i, row := range records {

				// Skipping Header Row
				if i == 0 {
					continue
				}

				// Stocks Data
				spQuotes, err := parser.ParseSpQuotesRecord(row)
				spQuotes.Ticker = stock

				if err != nil {
					continue
				}
				stocksData = append(stocksData, spQuotes)
			}

			if len(stocksData) > 999 {
				_, _ = stocksHistoryCollection.InsertMany(context.Background(), stocksData)
				stocksData = nil
			}
		}

	}
	if len(stocks) != 0 {
		_, _ = stocksHistoryCollection.InsertMany(context.Background(), stocksData)
		stocksData = nil
	}
	rest.OKResponse(w, "Status Ok")
}

func FetchStocksData(w http.ResponseWriter, r *http.Request) {

	database, err := db.DB(r.Context(), w)
	if err != nil {
		rest.ErrorResponse(w, "Failed to connect database", 500)
	}

	var stocksHistoryCollection = database.Collection(new(models.Stock).CollectionName())

	ticker := r.FormValue("ticker")
	page, err := strconv.ParseInt(r.FormValue("page"), 10, 0)
	if err != nil {
		page = 1
	}
	limit, err := strconv.ParseInt(r.FormValue("limit"), 10, 0)
	if err != nil {
		limit = 10
	}
	skip := (page - 1) * limit

	qry := bson.M{
		"ticker": strings.ToUpper(ticker),
	}

	opts := options.Find()
	opts.SetSkip(skip)
	opts.SetLimit(limit)
	opts.SetSort(bson.D{{Key: "trade_date", Value: 1}})
	iter, err := stocksHistoryCollection.Find(context.Background(), qry, opts)
	if err != nil {
		rest.ErrorResponse(w, "Failed to find data in StocksHistoryCollection", 500)
	}

	var stocksData []models.Stock
	err = iter.All(context.Background(), &stocksData)
	if err != nil {
		rest.ErrorResponse(w, "Failed to find data in StocksHistoryCollection", 500)
	}

	var chartFomattedData ChartFormattedData

	for _, d := range stocksData {
		chartFomattedData.Lows = append(chartFomattedData.Lows, d.Low)
		chartFomattedData.Highs = append(chartFomattedData.Highs, d.High)
		chartFomattedData.Opens = append(chartFomattedData.Opens, d.Open)
		chartFomattedData.Closes = append(chartFomattedData.Closes, d.Close)

		date, _ := parser.FromInt(d.Date, time.Local)
		chartFomattedData.TradeDate = append(chartFomattedData.TradeDate, date.Format("Jan 02 2006"))

	}

	rest.OKResponse(w, rest.Response{Items: chartFomattedData})
}

func SaveUniqueStockNames(stocks []string, collectionName *mongo.Collection) error {
	for _, s := range stocks {
		_, err := collectionName.InsertOne(context.Background(), bson.M{"name": s})
		if err != nil {
			return err
		}
	}
	return nil
}

func ResetCollection(collectionName *mongo.Collection) error {
	collectionName.DeleteMany(context.Background(), bson.M{})
	return nil
}
