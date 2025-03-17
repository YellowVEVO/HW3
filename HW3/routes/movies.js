const express = require('express');
const router = express.Router();
const Movie = require('../Movies');
const passport = require('passport');
const authenticate = passport.authenticate('jwt', { session: false });

router.get('/', async (req, res) => {
    try
    {
        console.log("Getting all movies");
        const movies = await Movie.find();
        res.json(movies);
    }
    catch (err)
    {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try
    {
        const movie = await Movie.findById(req.params.id);
        if (!movie) 
        {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.json(movie);
    }
    catch (err)
    {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', authenticate, async (req, res) => {
    const { title,releaseDate, genre,imageUrl ,actors } = req.body;

    if (!title || !releaseDate || !genre || !actors)
    {
        return res.status(400).json({ message: "All fields are required" });
    }
    const movie = new Movie({ title,imageUrl ,releaseDate, genre, actors });
    try
    {
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    }
    catch (err)
    {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', authenticate, async (req, res) => {
    try
    {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!movie) 
        {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.json(movie);
    }
    catch (err)
    {
        res.status(500).json({ message: err.message });
    }
});
router.delete('/:id', authenticate, async (req, res) =>{
    try
    {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) 
        {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.json({ message: "Movie deleted successfully" });
    }
    catch (err)
    {
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;
