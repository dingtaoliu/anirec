package main

import (
	"net/http"
	"strconv"
	"github.com/gin-gonic/gin"
)

type Anime struct {
	Id   int
	Title string
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

func main() {
	// http.HandleFunc("/", handler)
	// log.Fatal(http.ListeAndServe(":8080", nil))
	router := gin.Default()

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

	router.Run(":8080")
}
