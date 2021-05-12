// Copyright 2013 The Gorilla WebSocket Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package middleware

import (
	"fmt"
	"log"
)

// Hub maintains the set of active clients and broadcasts messages to the
// clients.
type Hub struct {
	// Registered clients.
	clients map[*Client]bool

	// Inbound messages from the clients.
	broadcast chan []byte

	// Register requests from the clients.
	register chan *Client

	// Unregister requests from clients.
	unregister chan *Client
}

func NewHub() *Hub {
	fmt.Println("NewHub()")
	return &Hub{
		broadcast:  make(chan []byte),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		clients:    make(map[*Client]bool),
	}
}

func (h *Hub) RunHub() {
	for {
		select {
		case client := <-h.register:
			// Register a client
			h.clients[client] = true
		case client := <-h.unregister:
			// Unregister a client
			if _, ok := h.clients[client]; ok {
				delete(h.clients, client)
				close(client.send)
			}
		case message := <-h.broadcast:
			// Process a message, cycle over clients
			for client := range h.clients {
				select {
				case client.send <- message:
					log.Printf("WebSocket RunHub:broadcast case:message: %s", string(message))
				default:
					close(client.send)
					delete(h.clients, client)
				}
			}
		}
	}
}
