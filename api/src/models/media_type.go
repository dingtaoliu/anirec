package models

import (
	"errors"
)

// using example from:
// https://stackoverflow.com/questions/39379928/golang-save-enum-type-to-sql-database-panic-sql-converting-exec-argument-1
type MediaType int64

const (
	ANIME MediaType = iota
	BOOK
	MOVIE
	TVSHOW
	GAME
)

var types = [...]string {
	"anime",
	"book",
	"movie",
	"tvshow",
	"game",
}

func (mt MediaType) ToString() string {
	return types[mt]
}

func (mt *MediaType) GetMediaType(str string) error {
	var err error
	switch str {
	case "anime":
		*mt = ANIME
	case "book": 
		*mt = BOOK
	case "movie":
		*mt = MOVIE
	case "tvshow":
		*mt = TVSHOW 
	case "game":
		*mt = GAME
	default:
		err = errors.New("Invalid media type")
	}

	return err
}