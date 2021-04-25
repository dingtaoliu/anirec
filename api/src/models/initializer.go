package models 

import (
	"fmt"
	"gorm.io/gorm"
	// "gorm.io/driver/sqlite"
	"gorm.io/driver/mysql"
)

var DB *gorm.DB

func InitializeDataBase() {
	// database, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	fmt.Sprintf("initializing database")
	dsn := "anyrec_user:anyrec_pass@tcp(database:3306)/anyrec_db?parseTime=True&loc=Local"
	database, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	
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