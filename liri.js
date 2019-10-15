require("dotenv").config();
 //keys//
 var keys = require ("./keys.js");
 var spotify = require('node-spotify-api');
 var axios = require ("axios");
 var moment = require("moment");

var fs = require("fs");
var query = process.argv[3];

var option = process.argv[2];

//spotify///
var spotify = new spotify(keys.spotify);
switch (option) {
    case "movie-this":
        movieThis(query);
        break;
        case "concert-this":
            concertThis(query);
            break;
            default:

            fs.readFile("random.txt", "utf8", function(error, data) {
                var data = api.split(",");
                var thatWay = data[1];
                if(error) {
                    return console.log(error);
                }
                spotifyCall(thatWay);
            })
}
function spotifyCall(songName) {
    spofity.search({type: 'track', query: 'songName'}, function(err, datat) {
        if (err) {
            return console.log('Error occured: ' , + err);

        } console.log("\n_Track_Info_" + "\nArtist: " + data.tracks.items[0].artists[0].name+ "\nSong: " + data.track.items[0].name + "\nLink: " + data.tracks.items[0].external_urls.spotifyCall+ "\nAlbuk: " + data.tracks.items[0].album.name+ "\nGreat song! Search another ");
    });
}

//OMDB//
function movieThis(movieName) {
    if (!movieName) {
        movieName = "Deadpool";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=plot-short&apiKey=trilogy";

    axios.get(queryUrl).then (
        function(response) {
            if(!movieName) {
                movieName= "Deadpool";
                console.log(("\n_movie_Info_" + "\nTitle: " + response.data.Title + "\nRelease Year: " + response.data.year + "\nRating: " + response.data.Rated + "\nRelease Country: " + response.data.Country + "\nLangauge: " + response.data.Langauage + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors + "\n" + "\n Great Choice!"); 
                
            }
        }
    );
}

//Band in town.//
function conncertThis (artist) {
    var bandsQueryUrl = "https://rest.bandsintown.com/artist/" + artist + "/events?app_id=codingbootcamp";

    axios.get(bandsQueryUrl).then(
        function(response) {
            console.log("_Upcoming Events_");
            console.log("Artist: " + artist + "\nVenue: " + response.data[0].venue.name + "\nLocation: " + response.data[0].venue.country  + "\mDate: " + response.data[0].datatime + "\nYeah buddy!");
         });
        }
    
