package models

import (
	"gorm.io/gorm"
	"fmt"
)

type Item struct {
	gorm.Model
	Title       string `json:"title"`
	Description string `json:"description"`
	Type   MediaType    `json:"media_type"`
}

func (item Item) GetSimilarItems() []Item {
	var items []Item

	DB.Raw("SELECT * FROM items ORDER BY RAND() LIMIT 4").Scan(&items)
	fmt.Println(items)
	return items
}

