package main

import (
	"back-end/cmd/create-analysis/db"
	"expvar"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/csrf"
	"github.com/gorilla/pat"
)

func main() {
	startServer()
}

func startDB() (*db.Server, error) {
	var srv *db.Server
	var err error

	// Local Mongo Service
	mongoURL := "mongodb://127.0.0.1:27017"

	// Sometimes mongo server takes longer to be ready
	// so we retry a few times before giving up
	for n := 0; n < 30; n++ {
		srv, err = db.NewServer(mongoURL)
		if err == nil {
			// got a connection!
			break
		}
		if err != nil {
			// no sleep here because the call to db.NewServer() has a timeout in it.
			continue
		}
	}
	return srv, err
}

func startServer() {
	statsMux := http.NewServeMux()
	r := pat.New()

	srv, err := startDB()
	if err != nil {
		log.Printf("Error while connecting to database : %v", err)
		os.Exit(1)
	}

	defer srv.Close() // close the server later

	// routes defined in routes.go
	Routes(r, srv)

	go func() {
		// run a separate port just for the debug info
		statsMux.Handle("/debug/vars", expvar.Handler())
		http.ListenAndServe(":6161", statsMux)
	}()

	log.Printf("Starting web server on port: '%d'\n", 1212)

	SKIP := NewSkipper()
	// csrf.Secure(false) if you're developing locally over plain HTTP.

	http.ListenAndServe(
		fmt.Sprintf(":%v", 1212),
		SKIP(csrf.Protect([]byte(""), csrf.Secure(false), csrf.Path("/go-api/"))(r)),
	)
}

// Should only be used by **sendgrid**
type SkipCSRF struct {
	h http.Handler
}

// NewSkipper is is the handler func for our skipper struct to skip csrf checks
func NewSkipper() func(h http.Handler) http.Handler {
	return func(h http.Handler) http.Handler {
		sk := &SkipCSRF{
			h: h,
		}
		return sk
	}
}

func (sr *SkipCSRF) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path == "/go-api/pages/api/sendgrid/secrettoken/1jS9DWw2jm9W9ZrhF8a7FbWAQb" {
		r = csrf.UnsafeSkipCheck(r)
	}
	sr.h.ServeHTTP(w, r)
}
