require("dotenv").config();
var keys = require("./keys.js");
var moment = require("moment");
var fs = require("fs");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var artist;

var inputString = process.argv;

var option = inputString[2];

var search = process.argv.slice(3).join("+");
var song = process.argv.slice(3).join(" ");

select();

function select() {
  if (option == "concert-this") {
    artist = search;
    getConcerts();
  } else if (option == "movie-this") {
    getMovie();
  } else if (option == "spotify-this-song") {
    getSong();
  } else if (option == "do-what-it-says") {
    soRandomxds();
  } else {
    console.log("Sorry that is out of my commands.");
  }
}

function getConcerts() {
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        artist +
        "/events?app_id=codingbootcamp"
    )
    .then(function(response) {
      if (response.data <= 0) console.log("Artist is resting zzz");
      else
        for (var x = 0; x < response.data.length; x++) {
          console.log("Venue: " + response.data[x].venue.name);
          console.log(
            "Location: " +
              response.data[x].venue.city +
              "," +
              response.data[x].venue.region
          );
          console.log(
            "Date: " + moment(response.data[x].datetime).format("LL")
          );
        }
    });
}

function getSong() {
  spotify.search({ type: "track", query: song }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    console.log("Artist: " + data.tracks.items[0].artists[0].name);
    console.log("Track: " + data.tracks.items[0].name);
    if (data.tracks.items[0].preview_url == null)
      console.log("No preview track available.");
    else console.log("Preview: " + data.tracks.items[0].preview_url);
    console.log("Album: " + data.tracks.items[0].album.name);
  });
}

function getMovie() {
  axios
    .get(
      "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy"
    )
    .then(function(response) {
      console.log("Title: " + response.data.Title);
      console.log("Year released: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
    });
}

function soRandomxds() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    var dataArr = data.split(",");
    option = dataArr[0];
    song = dataArr[1];
    select();
  });
}

var stalk = option + "\n";

fs.appendFile("log.txt", stalk, function(err) {

    if (err) {
      console.log(err);
    } else {
      console.log(stalk);
    }
  
  });
