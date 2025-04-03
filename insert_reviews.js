const mongoose = require('mongoose');
const Review = require('./Reviews');
require('dotenv').config();

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

const movieId = '67d7ab8baf508c9988d5cdeb';

const reviews = [
  {
    movieId,
    review: 'Mind-blowing concept and effects!',
    username: 'neo',
    rating: 5
  },
  {
    movieId,
    review: 'A must-watch for sci-fi lovers.',
    username: 'trinity',
    rating: 4
  }
];

Review.insertMany(reviews)
  .then(() => {
    console.log('Reviews inserted for The Matrix');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    mongoose.disconnect();
  });
