require("dotenv").config();
//spotify api//
var spotify = new spotify(keys.spotify);
//Spotify Key//
var keys = require("./keys");
var request = require("request");
var fs = require("fs");
var spotify = new spotify(keys.spotify);

// Calling the spotify api//
var callSPotifyAPI = function (songName) {
    if (songName === undefined) {
        songName = "1999";
    }
    spotify.search(
        {
            type: "track",
            query: songName,
            limit: 10,
        },
        function (err, data) {
            if (err) {
                console.log("Error occured: " + err);
                return;
            }
            var songs = data.tracks.items;
            for (var i = 0; i < songs.length; i++); {
                console.log(i);
                console.log("Artist Name: " + songs[i].artist[0].name);
                console.log("Song title: " + songs[i].name);
                console.log("Track number: " + songs[i].track_number);
                console.log("Album: " + songs[i].album.name);
                console.log("Release date: " + songs[i].album.release_date);
                console.log("Album type: " + songs[i].album.album_type);
                console.log("Previous Song: " + songs[i].preview_url);
                console.log("-------");
            }
        }
    );
};
//Calling the OMDB search//
var callOMDBAPI = function (movieName) {
    if (movieName === undefined) {
        movieName = "DeadPool";
    }
    var urlHit = "https://omdbapi.com/?t=" + movieName +
        "&=&plot=full&tomatoes=true&apikey=trilogy";
    Request(urlHit, function (err, response, body) {
        if (!error && response.statuscode === 200) {
            var jsonData = JSON.parse(body);
            console.log("Title: " + jsonData.Title);
            console.log("Year: " + jsonData.Year);
            console.log("Rated: " + jsonData.Rated);
            console.log("IMDB Rating: " + jsonData.imbdRating);
            console.log("Coumtry: " + jsonData.Country);
            console.log("Language: " + jsonData.Launguage);
            console.log("Plot: " + jsonData.Plot);
            console.log("Actors: " + jsonData.Actors);
            console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].value);
        }
    });
};
//function to see which commadn was used.//

//Spotify//
var userCommand = function (caseData, functionData) {
    switch (caseData) {
        case "spotify-this-song":
            callSPotifyAPI(functionData);
            break;

        //omdb//
        case "movie-this":
            callOMDBAPI(functionData);
            break;

        //LIRI does not understand//
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log("I don't understand your request, try google next time");
    }

};
//doWhatItSays function//

var doWhatItSays = function () {
    fs.readFile('random.txt', 'utf8', function (error, data) {
        console.log(data);
        var dataArr = data.split(',');
        if (dataArr.length === 2) {
            userCommand(dataArr[0], dataArr[1]);
        } else if (dataArr.length == 1) {
            userCommand(dataArr[0]);
        }
    });
};

//taking arguments and execute switch/

var cmdLnArgs = function (argOne, argTwo) {
    userCommand(argOne, argTwo);
};

//User imput to argument//

cmdLnArgs(process.argv[2], process.argv[3]);

