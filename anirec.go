package main

import (
	"os"
	"fmt"
	"net/http"
	"github.com/gin-gonic/gin"  
	"anirec/models"
	"anirec/controllers"
)

// @/ 
func home(c *gin.Context) {
	c.String(http.StatusOK, "Welcome")
}

func getDefaultEnv(key, defaultValue string) string {
    value := os.Getenv(key)
    if len(value) == 0 {
        return defaultValue
    }
    return value
}

func main() {
	fmt.Printf("Setting up router")
	router := gin.Default()

	fmt.Printf("connecting database")
	models.InitializeDataBase()

	router.GET("/", home)

	// CRUD API for ANIME
	// CREATE
	router.POST("/item", controllers.CreateItem)

	// READ
	router.GET("/items", controllers.GetItems)
	router.GET("/item/:id", controllers.GetItem)

	// UPDATE
	router.PUT("/item/:id", controllers.UpdateItem)

	// DELETE
	router.DELETE("/item/:id", controllers.DeleteItem)
	port := ":" + getDefaultEnv("PORT", "3000")
	router.Run(port)
}
