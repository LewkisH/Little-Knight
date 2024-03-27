package main

import (
	"fmt"
	"net/http"
)

func main() {
	// Serve static files from the current directory
	http.Handle("/", http.FileServer(http.Dir(".")))

	// Start the server on port 8080
	fmt.Println("Game is running on http://localhost:8080/")
	http.ListenAndServe(":8080", nil)
}
