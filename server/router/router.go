package router

import (
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/nicorivas/coffee/middleware"
)

func loggingMiddleware(next http.Handler) http.Handler {
	return handlers.LoggingHandler(os.Stdout, next)
}

// Router is exported and used in main.go
func Router() *mux.Router {

	// Create mux router
	router := mux.NewRouter()

	// Create and run websockets hub
	hub := middleware.NewHub()
	go hub.RunHub()

	// Log to console
	router.Use(loggingMiddleware)

	router.HandleFunc("/c/{room}", middleware.EnterRoom).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/message", middleware.CreateMessage).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/messages", middleware.GetMessages).Methods("GET", "OPTIONS")
	router.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) { middleware.ServeWs(hub, w, r) }).Methods("GET", "OPTIONS")
	return router
}
