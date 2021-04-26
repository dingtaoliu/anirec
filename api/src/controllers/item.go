package controllers

import (
	"net/http"
	"github.com/gin-gonic/gin" 
	"anirec/models"
	"fmt"
)

// POST @/item
func CreateItem(c *gin.Context) {
	title := c.PostForm("title")
	description := c.PostForm("description")

	var media_type models.MediaType
	// add error checking here
	media_type.GetMediaType(c.PostForm("media_type"))

	item := models.Item{
		Title: title, 
		Description: description,
		Type: media_type,
	}
	
	models.DB.Create(&item)
	c.JSON(http.StatusOK, item)
}

// GET @/items
func GetItems(c *gin.Context) {
	var allItems []models.Item
    models.DB.Find(&allItems)
	c.JSON(http.StatusOK, allItems)
}

// GET @/item/:id
func GetItem(c *gin.Context) {
	id := c.Param("id")
	var item models.Item 
	models.DB.First(&item, id)
	c.JSON(http.StatusOK, item)
}

// PUT @/item/:id
func UpdateItem(c *gin.Context) {
	id := c.Param("id")
	title := c.PostForm("title")
	var item models.Item
	if err := models.DB.First(&item, id); err != nil {
		c.String(http.StatusBadRequest, "Item does not exist")
	} else {
		item.Title = title
		models.DB.Save(&item)
		c.JSON(http.StatusOK, item)
	}
}

// DELETE @/item/:id
func DeleteItem(c *gin.Context) {
	id := c.Param("id")
	var item models.Item
	if err := models.DB.First(&item, id); err != nil {
		c.String(http.StatusBadRequest, "Item does not exist")
	} else {
		models.DB.Delete(&item)
		c.JSON(http.StatusOK, item)
	}
}

// GET @/item/:query
func SearchItems(c *gin.Context) {
	query := c.Query("query")
	var items []models.Item

	if err := models.DB.Where("title LIKE ?", fmt.Sprintf("%%%s%%", query)).Find(&items); err != nil {
		c.JSON(http.StatusOK, items)
	} else {
		c.String(http.StatusBadRequest, "Query not found")
	}
}