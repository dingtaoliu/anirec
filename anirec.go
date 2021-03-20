package main

import (
	"fmt"
	"net/http"
	"strconv"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
  	"gorm.io/driver/sqlite"
)

var DB *gorm.DB

type Anime struct {
	Id   int		`json:"id" gorm:"primary_key"`
	Title string	`json:"title"`
}

var animeStore = map[int]*Anime{
	0: &Anime{0, "Naruto"},
	1: &Anime{1, "Bleach"},
}

// POST @/anime
func createAnime(c *gin.Context) {
	id, _ := strconv.Atoi(c.PostForm("id"))
	title := c.PostForm("title")
	anime := Anime{id, title}
	animeStore[id] = &anime
	c.JSON(http.StatusOK, anime)
}

// GET @/anime
func getAnimes(c *gin.Context) {
	c.JSON(http.StatusOK, animeStore)
}

// GET @/anime/:id
func getAnime(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	anime := animeStore[id]
	c.JSON(http.StatusOK, anime)
}

// PUT @/anime
func updateAnime(c *gin.Context) {
	id, _ := strconv.Atoi(c.PostForm("id"))
	title := c.PostForm("title")
	if anime, ok := animeStore[id]; ok {
		anime.Title = title
		c.JSON(http.StatusOK, anime)
	} else {
		c.String(http.StatusBadRequest, "Anime does not exist")
	}
}

// DELETE @/anime
func deleteAnime(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	if anime, ok := animeStore[id]; ok {
		delete(animeStore, id)
		c.JSON(http.StatusOK, anime)
	} else {
		c.String(http.StatusBadRequest, "Anime does not exist")
	}
}

// @/ 
func home(c *gin.Context) {
	c.String(http.StatusOK, "Welcome")
}

func ConnectDataBase() {
	database, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
  
	if err != nil {
	  panic("Failed to connect to database!")
	}
  
	database.AutoMigrate(&Anime{})
  
	DB = database
  }

func main() {
	// http.HandleFunc("/", handler)
	// log.Fatal(http.ListeAndServe(":8080", nil))
	fmt.Printf("Setting up router")
	router := gin.Default()
	fmt.Printf("connecting database")
	ConnectDataBase()

	router.GET("/", home)

	// CRUD AI for ANIME
	// CREATE
	router.POST("/anime", createAnime)

	// READ
	router.GET("/animes", getAnimes)
	router.GET("/anime/:id", getAnime)

	// UPDATE
	router.PUT("/anime", updateAnime)

	// DELETE
	router.DELETE("/anime/:id", deleteAnime)
	router.Run(":3000")
}
