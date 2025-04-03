require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const authJwtController = require('./auth_jwt'); // You're not using authController, consider removing it
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./Users');
const Movie = require('./Movies'); // You're not using Movie, consider removing it
const reviewRoutes = require('./routes/reviews');
const moviesWithReviewsRoutes = require('./routes/moviesWithReviews');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

const router = express.Router();
app.use('/movies', require('./routes/movies'));
app.use('/users', require('./routes/users'));
app.use('/movies-with-reviews', moviesWithReviewsRoutes);
app.use('/reviews', reviewRoutes);


app.use('/', router);

const PORT = process.env.PORT || 8080; // Define PORT before using it
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // for testing only