package models 

import (
	"gorm.io/gorm"
	"gorm.io/driver/sqlite"
)

var DB *gorm.DB

func InitializeDataBase() {
	database, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
  
	if err != nil {
	  panic("Failed to connect to database!")
	}
	
	// Migrate schemas
	database.AutoMigrate(&Item{})

	// Create seed data
	database.Create(&Item{Title: "Naruto"})
	database.Create(&Item{Title: "Bleach"})
  
	DB = database
}