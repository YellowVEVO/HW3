const express = require('express');
const router = express.Router();
const Movie = require('../Movies');
const Review = require('../Reviews');

router.get('/', async (req, res) => {
  try {
    const moviesWithStats = await Movie.aggregate([
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'movieId',
          as: 'reviews'
        }
      },
      {
        $addFields: {
          averageRating: { $avg: "$reviews.rating" },
          reviewCount: { $size: "$reviews" }
        }
      }
    ]);
    res.json(moviesWithStats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
