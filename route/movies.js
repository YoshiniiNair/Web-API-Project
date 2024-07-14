const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Movies = require('../models/movies');
const { stringify } = require('flatted');


//connect to dataase
const connect = require('../connection');
const movies = require('../models/movies');
connect();


//get all
router.get('/', async (req, res) => {
    try{
        const movies = await Movies.find();
        res.json(movies);
        //res.send(stringify(movies));
    } catch (err) {
        res.status(500).json({ message: err.message });
        //res.status(500).send(stringify({ message: err.message }));
    }
});


//get one
router.get('/:id', getMovies, (req, res) => {
    //res.send(req.params.id)
    res.json(res.movies)
});
/*
router.get('/:id', getMovies, (req, res) => {
    res.json(res.movies)
})
*/


//create one
router.post('/', async (req, res) => {
    const movies = new Movies({
        name: req.body.name,
        releasedDate: req.body.releasedDate
    })
    try {
        const newMovies = await movies.save()
        res.status(201).json(newMovies)
        //res.status(201).send(stringify(newMovies))
    } catch (err) {
        res.status(400).json({ message: err.message })
        //res.status(400).send(stringify({ message: err.message }))
    }
});


//update one
router.patch('/:id', getMovies, async (req, res) => {
    if(req.body.name != null){
        res.movies.name = req.body.name
    }
    if(req.body.releasedDate != null){
        res.movies.releasedDate = req.body.releasedDate
    }
    try{
        const updateMovies = await res.movies.save();
        res.json(updateMovies);
        //res.send(stringify(updateMovies));
    } catch(err){
        res.status(400).json({ message: err.message })
        //res.status(400).send(stringify({ message: err.message }));
    }
});


//delete one
router.delete('/:id', getMovies, async (req, res) => {
    try{
        const deleteMovie = await Movies.findByIdAndDelete(req.params.id);
        if(!deleteMovie){
            return res.status(404).json({ message: 'Movie Not Found' });
            //return res.status(404).send('Movie not found');
        }
        res.json({ message: 'Deleted movie' });
        //res.send(stringify({ message: 'Deleted movies' }))
    } catch(err){
        res.status(500).json({ message: err.message })
        //res.status(500).send(stringify({ message: err.message }))
    }
});


//functions
async function getMovies(req, res, next) {
    let movies
    try{
        movies = await Movies.findById(req.params.id)
        if(movies == null) {
            return res.status(404).json({ message: 'Movie not found' });
            //return res.status(500).send(stringify({ message: 'Movie not found' }));
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
        //return res.status(500).send(stringify({ message: err.message }));
    }

    res.movies = movies
    next()
};

module.exports = router