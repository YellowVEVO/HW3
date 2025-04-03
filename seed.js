require('dotenv').config();
const mongoose = require('mongoose');
const Movie = require('./Movies');
const Review = require('./Reviews');
const movieId = '642a1cfe8b1a2f0017d6e001';
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

  const movies = [
    {
        title: "Inception",
        releaseDate: 2010,
        genre: "Science Fiction",
        imageUrl: "https://m.media-amazon.com/images/I/51v5ZpFyaFL._AC_.jpg",
        actors: [
            { actorName: "Leonardo DiCaprio", characterName: "Dom Cobb" },
            { actorName: "Joseph Gordon-Levitt", characterName: "Arthur" }
        ]
    },
    {
        title: "The Dark Knight",
        releaseDate: 2008,
        genre: "Action",
        imageUrl: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQkUywIUXDjHSQJIaNHYVs08osgBpF5Ot-xmB_omyEZeeRP9Xug",
        actors: [
            { actorName: "Christian Bale", characterName: "Bruce Wayne" },
            { actorName: "Heath Ledger", characterName: "Joker" }
        ]
    },
    {
        title: "Interstellar",
        releaseDate: 2014,
        genre: "Science Fiction",
        imageUrl: "https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SL1500_.jpg",
        actors: [
            { actorName: "Matthew McConaughey", characterName: "Cooper" },
            { actorName: "Anne Hathaway", characterName: "Brand" }
        ]
    },
    {
        title: "The Godfather",
        releaseDate: 1972,
        genre: "Drama",
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
        actors: [
            { actorName: "Marlon Brando", characterName: "Vito Corleone" },
            { actorName: "Al Pacino", characterName: "Michael Corleone" }
        ]
    },
    {
        title: "Pulp Fiction",
        releaseDate: 1994,
        genre: "Adventure",
        imageUrl: "https://m.media-amazon.com/images/I/71c05lTE03L._AC_SY679_.jpg",
        actors: [
            { actorName: "John Travolta", characterName: "Vincent Vega" },
            { actorName: "Samuel L. Jackson", characterName: "Jules Winnfield" }
        ]
    }

];

Movie.insertMany(movies)
    .then(() => {
        console.log("movies inserted successfully!");
        mongoose.connection.close();
    })
    .catch(err => console.error("Error inserting movies:", err));