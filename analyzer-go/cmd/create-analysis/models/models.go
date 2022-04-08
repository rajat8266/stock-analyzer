package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Stock represents structure of stock's historical data
type Stock struct {
	ID     primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Ticker string             `json:"ticker" bson:"ticker"`
	Date   int                `json:"trade_date" bson:"trade_date"`
	Open   float64            `json:"open" bson:"open"`
	High   float64            `json:"high" bson:"high"`
	Low    float64            `json:"low" bson:"low"`
	Close  float64            `json:"close" bson:"close"`
}

// CollectionName defines the name of the stocks.historical collection.
func (f *Stock) CollectionName() string {
	return "stocks.historical"
}

// UniqueStocks represents structure of unique stock's name
type UniqueStocks struct {
	ID   primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Name string             `json:"name" bson:"name"`
}

// CollectionName defines the name of the stocks.unique collection.
func (f *UniqueStocks) CollectionName() string {
	return "stocks.unique"
}
