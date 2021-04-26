package models

import (
	"encoding/csv"
	"io"
	"log"
	"os"

	"gorm.io/gorm"

	// "gorm.io/driver/sqlte"
	"gorm.io/driver/mysql"
)

var DB *gorm.DB

func InitializeDataBase() {
	// database, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	println("initializing database")
	// db_user := os.Getenv("MYSQL_USER")
	// db_password := os.Getenv("MYSQL_PASSWORD")
	// db_name := os.Getenv("MYSQL_DATABASE") 
	dsn := "anyrec_user:anyrec_pass@tcp(localhost:3306)/anyrec_db?parseTime=True&loc=Local"
	database, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("Failed to connect to database!")
	}
	database.Migrator().DropTable(&Item{})
	// Migrate schemas
	database.AutoMigrate(&Item{})

	DB = database

	SeedData("../../seed_data/anime.csv")
}

func SeedData(seedFile string) {
	f, err := os.Open(seedFile)
	if err != nil {
		log.Fatal("Unable to read input file "+seedFile, err)
	}
	defer f.Close()

	reader := csv.NewReader(f)
	numRecords := 50
	for i := 0; i < numRecords; i++ {
		record, err := reader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatal(err)
		}

		if i == 0 {
			continue
		}

		title := record[0]
		desc := record[8]

		item := Item{
			Title:       title,
			Description: desc,
			Type:        ANIME,
		}

		DB.Create(&item)
	}
}
