const express = require('express');
const router = express.Router();
const Review = require('../Reviews');
const { isAuthenticated } = require('../auth_jwt');

router.get('/', async (req, res) => {
  const filter = req.query.movieId ? { movieId: req.query.movieId } : {};
  try {
    const reviews = await Review.find(filter);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', isAuthenticated, async (req, res) => {
  const review = new Review({
    movieId: req.body.movieId,
    review: req.body.review,
    username: req.body.username,
    rating: req.body.rating
  });

  try {
    const saved = await review.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const deleted = await Review.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Review not found' });
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/:movieId', async (req, res) => {
    try {
      const reviews = await Review.find({ movieId: req.params.movieId });
      if (!reviews.length) {
        return res.status(404).json({ message: 'No reviews found for this movie.' });
      }
      res.json(reviews);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

module.exports = router;
