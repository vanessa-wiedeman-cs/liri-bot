require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);


var inputString = process.argv;

var option = inputString[2];

var search = process.argv.slice(3).join("+");

if(option == "concert-this"){
    console.log("1");
}
else if(option == "movie-this"){
    console.log("2");
}
else if(option == "spotify-this-song"){
    console.log("3");
}
else if(option == "do-what-it-says"){
    console.log("4");
}
else{
    console.log("Sorry that is out of my commands.");
}