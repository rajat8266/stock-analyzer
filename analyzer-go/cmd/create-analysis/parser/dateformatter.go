package parser

import (
	"fmt"
	"strconv"
	"strings"
	"time"
)

var dateLayouts = []string{
	"010206",
	"0102060304",
	"Jan 2 2006 3:04PM",
	"Jan 2 2006 3:04 PM",
	"Jan 2 2006 03:04 PM",
	"Jan 02 2006 03:04 PM",
	"Jan 02 2006 3:04 PM",
	"Jan 2 2006 15:04:05",
	"2006-Jan-02 03:04:05 PM",
	"2006-Jan-02 15:04:05",
	"2006-Jan-02",
	"2006-01-02",
	"2006-01-02 15:04:05.000",
	"2006-01-02 15:04:05",
	"2006-01-02T15:04:05",
	"2006-01-02 03:04 PM",
	"2006-01-02 3:04 PM",
	"02-Jan-06 03:04:05 PM",
	"2-Jan-06",
	"01/02/2006 03:04 PM MST",
	"01/02/2006 03:04:05 PM",
	"01/02/2006 15:04:05",
	"01/02/2006 03:04 PM",
	"01/02/2006 3:04 PM",
	"01/02/06 15:04:05",
	"01/02/06 03:04 PM",
	"01/02/2006",
	"1/2/06",
	"1/2/06 15:04",
	"1/2/2006 3:4:05 PM",
	"1/2/2006 3:04:05 PM",
	"1/2/2006 03:04:05 PM",
	"1/2/2006 03:04 PM",
	"1/2/2006 3:04 PM",
	"1/2/2006 15:04:05",
	"1/2/2006 15:04:05 MST",
	"1/2/2006 15:04:05.000000",
	"1/2/2006 15:04:05.000000 MST",
	"1/2/2006 15:04",
	"1/2/2006",
	"01/02/06",
	"20060102 15:04:05",
	"20060102 1504",
	"20060102",
	"03:04:05 PM", //trade_time_1 and 2 could be just the hours part, no date part
	"3:04:05 PM",  //trade_time_1 and 2 could be just the hours part, no date part
	"15:04:05",    //trade_time_1 and 2 could be just the hours part, no date part
}

// Parse converts a string to a date time
func Parse(date string, loc *time.Location) (time.Time, error) {
	var parsedDate time.Time
	suitableFormatFound := false
	toParse := strings.TrimSpace(date)
	toParse = strings.Replace(date, "\"", "", -1)

	if toParse == "" {
		return parsedDate, nil
	}
	_, err := strconv.ParseInt(toParse, 0, 64) // next hack should apply only to numeric formats
	if err == nil && (len(toParse) == 5 || len(toParse) == 9) {
		toParse = "0" + toParse
	}

	for _, format := range dateLayouts {
		stamp, er := time.ParseInLocation(format, toParse, loc)
		if er == nil {
			parsedDate = stamp
			suitableFormatFound = true
			break
		}
	}

	if !suitableFormatFound {
		return parsedDate, fmt.Errorf(
			"could not find format to parse date %s",
			toParse,
		)
	}

	return parsedDate, nil
}

// ParseAsInt converts a string to a date time and returns
// its int representation
func ParseAsInt(toParse string, loc *time.Location) (int, error) {
	date, err := Parse(toParse, loc)

	if err != nil {
		return 0, err
	}

	return AsLocalizedInt(date, loc)
}

// FromInt converts an int into a localized date without the
// time portion
func FromInt(i int, loc *time.Location) (time.Time, error) {
	t, err := time.Parse("20060102", strconv.Itoa(i))

	if err != nil {
		return t, err
	}

	return time.Date(
		t.Year(),
		t.Month(),
		t.Day(),
		0, 0, 0, 0,
		loc,
	), nil
}

// AsLocalizedInt converts a date into an int
// formatted as yyyyMMdd using the specified timezone
func AsLocalizedInt(date time.Time, loc *time.Location) (int, error) {
	if date.IsZero() {
		return 0, nil
	}

	return strconv.Atoi(date.In(loc).Format("20060102"))
}
