package middleware

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/nicorivas/coffee/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// DB connection string
// for localhost mongoDB
// const connectionString = "mongodb://localhost:27017"
// for mongoDB in the cloud
const connectionString = "mongodb+srv://admin:iCga1kmX@cluster0.sdpua.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

// Database Name
const dbName = "test"

// Collection name
const collName = "todolist"

// collection object/instance
var client *mongo.Client
var collection *mongo.Collection

// Initialize connection with MongoDB
func init() {
	fmt.Println("Connecting to MongoDB")
	var err error

	// Set client options
	clientOptions := options.Client().ApplyURI(connectionString)

	// Create client
	fmt.Println("Create client")
	client, err = mongo.NewClient(clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	// Get context
	fmt.Println("Get context")

	// Connect to MongoDB
	fmt.Println("Connect to MongoDB")
	err = client.Connect(context.Background())
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connected")

	// Check the connection
	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Pinged")

	// Update status
	fmt.Println("Connected to MongoDB!")
	collection = client.Database(dbName).Collection("room")
}

func EnterRoom(w http.ResponseWriter, r *http.Request) {
	fmt.Println("EnterRoom()")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	//log.Printf("%s %s %s %s %d %s\n", r.RemoteAddr, r.Method, r.URL, r.Proto, r.ContentLength, r.Host)
	//for k, v := range r.Header {
	//	log.Printf("Header field %q, Value %q\n", k, v)
	//}
	// Get variables from route
	vars := mux.Vars(r)
	// Instantiate the MongoDB collection
	collection = client.Database(dbName).Collection(vars["room"])
}

// CreateMessage
func CreateMessage(w http.ResponseWriter, r *http.Request) {
	//fmt.Println("CreateMessage()")
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var message models.Message
	err := json.NewDecoder(r.Body).Decode(&message)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	// fmt.Println(message, r.Body)
	insertOneMessage(message)
	json.NewEncoder(w).Encode(message)
	//fmt.Println("message.text = ", message.Text)
	//fmt.Println("CreateMessage().end")
}

// /api/messages
// Get messages from DB.
func GetMessages(w http.ResponseWriter, r *http.Request) {
	//fmt.Println("/api/messages GetMessages()")

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var messages []bson.M
	cursor, err := collection.Find(context.Background(), bson.M{})
	defer cursor.Close(context.Background())
	if err != nil {
		log.Fatal(err)
	}
	cursor.All(context.Background(), &messages)
	json.NewEncoder(w).Encode(messages)
}

// Insert a message in the DB
func insertOneMessage(message models.Message) {
	//fmt.Println("insertOneMessage()")
	_, err := collection.InsertOne(context.Background(), message)
	if err != nil {
		log.Fatal(err)
	}
	//fmt.Println("Inserted a Single Record ", insertResult.InsertedID)
}
