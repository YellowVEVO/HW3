const express  = require('express');
const mongoose = require('mongoose');
const router   = express.Router();
const Movie    = require('../Movies'); // Corrected path
const { isAuthenticated } = require('../auth_jwt');

// GET all or top-rated
// GET /api/movies?sort=true
router.get('/', isAuthenticated, async (req, res) => {
  try {
    if (req.query.sort === 'true') {
      // aggregate by avg rating
      const pipeline = [
        { $unwind: { path: '$reviews', preserveNullAndEmptyArrays: true } },
        { $group: {
            _id:       '$_id',
            title:     { $first: '$title' },
            imageUrl:  { $first: '$imageUrl' },
            releaseDate:{ $first: '$releaseDate' },
            genre:     { $first: '$genre' },
            avgRating: { $avg: '$reviews.rating' },
          }
        },
        { $sort: { avgRating: -1 } }
      ];
      const top = await Movie.aggregate(pipeline);
      return res.json(top);
    }

    // plain find
    const movies = await Movie.find();
    res.json(movies);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// GET detail with avgRating + full reviews
router.get('/:id', isAuthenticated, async (req, res) => {
  try {
    const movieId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({ message: 'Invalid movie ID' });
    }

    const pipeline = [
      { $match: { _id: mongoose.Types.ObjectId(movieId) } },
      { $unwind: { path: '$reviews', preserveNullAndEmptyArrays: true } },
      { $group: {
          _id:        '$_id',
          title:      { $first: '$title' },
          imageUrl:   { $first: '$imageUrl' },
          releaseDate:{ $first: '$releaseDate' },
          genre:      { $first: '$genre' },
          actors:     { $first: '$actors' },
          avgRating:  { $avg: '$reviews.rating' },
          reviews:    { $push: '$reviews' }
        }
      }
    ];

    const [detail] = await Movie.aggregate(pipeline);
    if (!detail) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(detail);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// POST a new movie (admin)
router.post('/', isAuthenticated, async (req, res) => {
  const { title, releaseDate, genre, imageUrl, actors } = req.body;
  if (!title || !releaseDate || !genre || !imageUrl || !actors) {
    return res.status(400).json({ message: 'All fields required' });
  }
  try {
    const movie = new Movie({ title, releaseDate, genre, imageUrl, actors });
    const saved = await movie.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// PUT update movie (admin)
router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    const updated = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Movie not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// DELETE movie (admin)
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const deleted = await Movie.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Movie not found' });
    res.json({ message: 'Movie deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// NEW: POST a review on a movie
// POST /api/movies/:id/review
router.post('/:id/review', isAuthenticated, async (req, res) => {
  const { rating, comment } = req.body;
  if (rating == null || !comment) {
    return res.status(400).json({ message: 'Rating & comment required' });
  }

  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    movie.reviews.push({
      userId:  req.user._id.toString(),  // from JWT payload
      rating,
      comment
    });

    await movie.save();
    res.status(201).json({ message: 'Review added' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
