package db

import (
	"context"
	"io"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

// Server type holds the current session and a Logger instance to
// use across rackness
type Server struct {
	DBsession *mongo.Client
}

//NewServer connects to MongoDB and returns a pointer to the conenction
func NewServer(url string) (*Server, error) {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	opts := options.Client()
	opts.ApplyURI(url)

	client, err := mongo.Connect(ctx, opts)
	if err != nil {
		return nil, err
	}

	// check if the mongo server is alive, mongo.Connect doesn't check if the server is alive
	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		return nil, err
	}

	return &Server{
		DBsession: client,
	}, nil
}

// db defines pointer to Database
func DB(ctx context.Context, w io.Writer) (*mongo.Database, error) {
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		panic(err)
	}
	return client.Database("analysis-web"), nil
}

//Close closes the connection to MongoDB
func (s *Server) Close() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	s.DBsession.Disconnect(ctx)
	cancel()
}
