//THIS IS THE CODE I GRABBED FROM SOMEONE ELSE TO MAKE THE HOMEWORK LINK AND RUN THE COMMANDS; MY CODE IS COMMENTED COMPLETED AT THE BOTTOM OF THIS CODE//
// Require npm to link to keys
require("dotenv").config();

// Require the key.js file 
var keys = require('./keys.js');

// Require the node package manager for Spotify, request and moment
var Spotify = require('node-spotify-api');
var request = require('request');
var moment = require('moment');

// Save key to a variable 
var spotify = new Spotify(keys.spotify);

// Include file system module
var fs = require("fs");

// Grab all of the command line arguments from Node
var nodeArgs = process.argv;
//console.log(process.argv);

var userInput = "";
var nextUserInput = "";

//Grab user input for songs, artists and movie names
for (var i = 3; i < nodeArgs.length; i++) {

    //If userInput is more than 1 word
    if (i > 3 && i < nodeArgs.length) {
        userInput = userInput + "%20" + nodeArgs[i];
    }
    //If userInput is only 1 word
    else {
        userInput += nodeArgs[i];
    }
    console.log(userInput);
}

//Remove %20 when pushing to log.txt
for (var i = 3; i < nodeArgs.length; i++) {
    nextUserInput = userInput.replace(/%20/g, " ");
}

var userCommand = process.argv[2];
console.log(userCommand);
console.log(process.argv);
runLiri();

//Switch statement for commands
function runLiri() {
    switch (userCommand) {
        case "concert-this":

            //Append userInput to log.txt
            fs.appendFileSync("log.txt", nextUserInput + "\n----------------\n", function (error) {
                if (error) {
                    console.log(error);
                };
            });

            //Run request to bandsintown with the specified artist
            var queryURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp"
            request(queryURL, function (error, response, body) {
                //If no error and response is a success
                if (!error && response.statusCode === 200) {
                    //Parse the json response
                    var data = JSON.parse(body);
                    //Loop through array
                    for (var i = 0; i < data.length; i++) {
                        //Get venue name
                        console.log("Venue: " + data[i].venue.name);
                        //Append data to log.txt
                        fs.appendFileSync("log.txt", "Venue: " + data[i].venue.name + "\n", function (error) {
                            if (error) {
                                console.log(error);
                            };
                        });

                        //Get venue location
                        //If statement for concerts without a region
                        if (data[i].venue.region == "") {
                            console.log("Location: " + data[i].venue.city + ", " + data[i].venue.country);
                            //Append data to log.txt
                            fs.appendFileSync("log.txt", "Location: " + data[i].venue.city + ", " + data[i].venue.country + "\n", function (error) {
                                if (error) {
                                    console.log(error);
                                };
                            });

                        } else {
                            console.log("Location: " + data[i].venue.city + ", " + data[i].venue.region + ", " + data[i].venue.country);
                            //Append data to log.txt
                            fs.appendFileSync("log.txt", "Location: " + data[i].venue.city + ", " + data[i].venue.region + ", " + data[i].venue.country + "\n", function (error) {
                                if (error) {
                                    console.log(error);
                                };
                            });
                        }

                        //Get date of show
                        var date = data[i].datetime;
                        date = moment(date).format("MM/DD/YYYY");
                        console.log("Date: " + date)
                        //Append data to log.txt
                        fs.appendFileSync("log.txt", "Date: " + date + "\n----------------\n", function (error) {
                            if (error) {
                                console.log(error);
                            };
                        });
                        console.log("----------------")
                    }
                }
            });

            break;
        case "spotify-this-song":
            console.log("here");
            //If statement for no song provided
            if (!userInput) {
                userInput = "The%20Sign";
                nextUserInput = userInput.replace(/%20/g, " ");

            }

            //Append userInput to log.txt
            fs.appendFileSync("log.txt", nextUserInput + "\n----------------\n", function (error) {
                if (error) {
                    console.log(error);
                };
            });

            console.log(spotify);
            spotify.search({

                type: "track",
                query: userInput
            }, function (err, data) {
                if (err) {
                    console.log("Error occured: " + err)
                }

                //Assign data being used to a variable
                var info = data.tracks.items
                // console.log(info);

                //Loop through all the "items" array
                for (var i = 0; i < info.length; i++) {
                    //Store "album" object to variable
                    var albumObject = info[i].album;
                    var trackName = info[i].name
                    var preview = info[i].preview_url
                    //Store "artists" array to variable
                    var artistsInfo = albumObject.artists
                    //Loop through "artists" array
                    for (var j = 0; j < artistsInfo.length; j++) {
                        console.log("Artist: " + artistsInfo[j].name)
                        console.log("Song Name: " + trackName)
                        console.log("Preview of Song: " + preview)
                        console.log("Album Name: " + albumObject.name)
                        console.log("----------------")
                        //Append data to log.txt
                        fs.appendFileSync("log.txt", "Artist: " + artistsInfo[j].name + "\nSong Name: " + trackName + "\nPreview of Song: " + preview + "\nAlbum Name: " + albumObject.name + "\n----------------\n", function (error) {
                            if (error) {
                                console.log(error);
                            };
                        });
                    }
                }
            })

            break;
        case "movie-this":
            //If statement for no movie provided
            if (!userInput) {
                userInput = "Mr%20Nobody";
                nextUserInput = userInput.replace(/%20/g, " ");
            }

            //Append userInput to log.txt
            fs.appendFileSync("log.txt", nextUserInput + "\n----------------\n", function (error) {
                if (error) {
                    console.log(error);
                };
            });

            //Run request to OMDB
            var queryURL = "https://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy"
            request(queryURL, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    var info = JSON.parse(body);
                    console.log("Title: " + info.Title)
                    console.log("Release Year: " + info.Year)
                    console.log("OMDB Rating: " + info.Ratings[0].Value)
                    console.log("Rating: " + info.Ratings[1].Value)
                    console.log("Country: " + info.Country)
                    console.log("Language: " + info.Language)
                    console.log("Plot: " + info.Plot)
                    console.log("Actors: " + info.Actors)

                    //write to .log.txt
                    fs.appendFileSync("log.txt", "Title: " + info.Title + "\nRelease Year: " + info.Year + "\nIMDB Rating: " + info.Ratings[0].Value + "\nRating: " +
                        info.Ratings[1].Value + "\nCountry: " + info.Country + "\nLanguage: " + info.Language + "\nPlot: " + info.Plot + "\nActors: " + info.Actors + "\n----------------\n",
                        function (error) {
                            if (error) {
                                console.log(error);
                            };
                        });
                }
            });

            break;
    }
}

if (userCommand == "do-what-it-says") {
    var fs = require("fs");


    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error)
        }

       
        var textArr = data.split(",");
        userCommand = textArr[0];
        userInput = textArr[1];
        nextUserInput = userInput.replace(/%20/g, " ");
        runLiri();
    })
}


//* in this section I tried to code the homework from top to bottom but I kept getting an error messafe with Spotify_ID. I could not figure out where my syntax whent wrong or why it was not working. I had to go online and grab a project and it worked for me.*//

// require("dotenv").config();
// //keys//
// var keys = require("./keys.js");
// var Spotify = require('node-spotify-api');
// var axios = require("axios");
// var moment = require("moment");

// var fs = require("fs");
// var query = process.argv[3];

// var option = process.argv[2];

// //spotify///
// var spotify = new Spotify(keys.Spotify);
// switch (option) {
//     case "movie-this":
//         movieThis(query);
//         break;
//         case "spotify-this-song":
//             spotifyCall(query);
//             break;
//     case "concert-this":
//         concertThis(query);
//         break;
//     default:

//         fs.readFile("random.txt", "utf8", function (error, data) {
//             var data = api.split(",");
//             var thatWay = data[1];
//             if (error) {
//                 return console.log(error);
//             }
//             spotifyCall(thatWay);
//         })
// }
// function spotifyCall(songName) {
//     spofity.search({ type: 'track', query: 'songName' }, function (err, datat) {
//         if (err) {
//             return console.log('Error occured: ', + err);

//         } console.log("\n_Track_Info_" + "\nArtist: " + data.tracks.items[0].artists[0].name + "\nSong: " + data.track.items[0].name + "\nLink: " + data.tracks.items[0].external_urls.spotifyCall + "\nAlbuk: " + data.tracks.items[0].album.name + "\nGreat song! Search another ");
//     });
// }

// //OMDB//
// function movieThis(movieName) {
//     if (!movieName) {
//         movieName = "Deadpool";
//     }
//     var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=plot-short&apiKey=trilogy";

//     axios.get(queryUrl).then(
//         function (response) {
//             if (!movieName) {
//                 movieName = "Deadpool";
//             }
//             console.log("\n_movie Info_" + "\nTitle: " + response.data.Title + "\nRelease Year: " + response.data.year + "\nRating: " + response.data.Rated + "\nRelease Country: " + response.data.Country + "\nLangauge: " + response.data.Langauage + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors + "\n" + "\n Love this one!");


//         }
//     );
// }

// //Band in town.//
// function conncertThis(artist) {
//     var bandsQueryUrl = "https://rest.bandsintown.com/artist/" + artist + "/events?app_id=codingbootcamp";

//     axios.get(bandsQueryUrl).then(
//         function (response) {
//             console.log("_Upcoming Events_");
//             console.log("Artist: " + artist + "\nVenue: " + response.data[0].venue.name + "\nLocation: " + response.data[0].venue.country + "\mDate: " + response.data[0].datatime + "\nYeah buddy!");
//         });
// }

