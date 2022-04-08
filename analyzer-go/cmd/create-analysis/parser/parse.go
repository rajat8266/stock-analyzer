package parser

import (
	"back-end/cmd/create-analysis/models"
	"strconv"
	"strings"
	"time"
)

func ParseSpQuotesRecord(record []string) (models.Stock, error) {

	spQuotes := models.Stock{}

	date := strings.Trim(record[0], " ")
	tradeDate, err := ParseAsInt(date, time.Local)
	if err != nil {
		return spQuotes, err
	}

	openValue, openErr := strconv.ParseFloat(strings.TrimSpace(record[1]), 64)
	if openErr != nil {
		return spQuotes, openErr
	}
	highValue, highErr := strconv.ParseFloat(strings.TrimSpace(record[2]), 64)
	if highErr != nil {
		return spQuotes, highErr
	}
	lowValue, lowErr := strconv.ParseFloat(strings.TrimSpace(record[3]), 64)
	if lowErr != nil {
		return spQuotes, lowErr
	}
	closeValue, closeErr := strconv.ParseFloat(strings.TrimSpace(record[4]), 64)
	if closeErr != nil {
		return spQuotes, closeErr
	}

	spQuotes.Date = tradeDate
	spQuotes.Open = openValue
	spQuotes.High = highValue
	spQuotes.Low = lowValue
	spQuotes.Close = closeValue

	return spQuotes, nil
}
