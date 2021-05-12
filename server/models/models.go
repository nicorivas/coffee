package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Message struct {
	ID   primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Text string             `json:"text,omitempty"`
	User string             `json:"user,omitempty"`
}
