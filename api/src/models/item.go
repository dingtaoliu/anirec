package models

import (
	"gorm.io/gorm"
)

type Item struct {
	gorm.Model
	Title       string `json:"title"`
	Description string `json:"description"`
	Type   MediaType    `json:"media_type"`
}



