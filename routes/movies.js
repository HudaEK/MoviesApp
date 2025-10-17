var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var debug = require("debug")("moviesApp:server");

// Models
var Movie = require("../models/Movie.js");

/* GET movies listing */
router.get("/", function (req, res) {
    Movie.find().then(function (movies) {
        res.status(200).json(movies);
    }).catch(function (err) {
        res.status(500).send(err);
    });
});

/* GET single movie by Id */
router.get("/:id", function (req, res) {
    Movie.findById(req.params.id).then(function (movieinfo) {
        if (movieinfo) {
            res.status(200).json(movieinfo);
        } else {
            res.status(404).send("Movie not found");
        }
    }).catch(function (err) {
        res.status(500).send(err);
    });
});

/* POST a new movie */
router.post("/", function (req, res) {
    Movie.create(req.body).then(function (movie) {
        res.status(201).json(movie);
    }).catch(function (err) {
        res.status(500).send(err);
    });
});

/* PUT - Update a movie by Id */
router.put("/:id", function (req, res) {
    Movie.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(function (movie) {
        if (movie) {
            res.status(200).json(movie);
        } else {
            res.status(404).send("Movie not found for updating");
        }
    }).catch(function (err) {
        res.status(500).send(err);
    });
});

/* DELETE - Delete a movie by Id */
router.delete("/:id", function (req, res) {
    Movie.findByIdAndDelete(req.params.id).then(function (movie) {
        if (movie) {
            res.status(200).json({ message: "Movie successfully deleted" });
        } else {
            res.status(404).send("Movie not found for deletion");
        }
    }).catch(function (err) {
        res.status(500).send(err);
    });
});

module.exports = router;