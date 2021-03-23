package models 

import (
	"gorm.io/gorm"
)

type Item struct {
	gorm.Model
	Title string	`json:"title"`
	MediaType string `json:"media_type"`
}
