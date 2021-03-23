package controllers

import (
	"net/http"
	"github.com/gin-gonic/gin" 
	"anirec/models"
)

// POST @/item
func CreateItem(c *gin.Context) {
	title := c.PostForm("title")
	item := models.Item{Title: title}
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