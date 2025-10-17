var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var debug = require("debug")("moviesApp:server");

// Models
var Bookmark = require("../models/Bookmark.js");

/* GET bookmarks listing for a specific user by userId. */
router.get("/user/:userId", function (req, res) {
    Bookmark.find({ user: req.params.userId })
        .sort("-addeddate")
        .populate("movie") 
        .populate("user", "name email") 
        .then(function (bookmarks) {
            res.status(200).json(bookmarks);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
});

/* POST a new bookmark*/
router.post("/", function (req, res) {
    Bookmark.create(req.body).then(function (bookmarkinfo) {
        res.status(201).json(bookmarkinfo);
    }).catch(function (err) {
        res.status(500).send(err);
    });
});

/* DELETE an existing bookmark by its ID */
router.delete("/:id", function (req, res) {
    Bookmark.findByIdAndDelete(req.params.id).then(function (bookmark) {
        if (bookmark) {
            res.status(200).json({ message: "Bookmark successfully deleted" });
        } else {
            res.status(404).send("Bookmark not found");
        }
    }).catch(function (err) {
        res.status(500).send(err);
    });
});

module.exports = router;