package main

import (
	"os"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin" 
	"github.com/gin-gonic/contrib/static"

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

	// router.GET("/", home)
	router.Use(static.Serve("/", static.LocalFile("./build", true)))

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


	// SEARCH 
	router.GET("/search", controllers.SearchItems)

	// SIMILAR ITEMS 
	router.GET("/similarItems/:id", controllers.SimilarItems)

	port := ":" + getDefaultEnv("PORT", "5000")
	router.Run(port)
}
