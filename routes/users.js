var express = require("express");
var router = express.Router();
var debug = require("debug")("moviesApp:server");

// Model
var User = require("../models/User.js");

/* GET users listing. */
router.get("/", function (req, res) {
    User.find().then(function (users) {
        res.status(200).json(users);
    }).catch(function (err) {
        res.status(500).send(err);
    });
});

/* GET single user by Id */
router.get("/:id", function (req, res) {
    User.findById(req.params.id).then(function (user) {
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send("User not found");
        }
    }).catch(function (err) {
        res.status(500).send(err);
    });
});

/* POST a new user */
router.post("/", function (req, res) {
    User.create(req.body).then(function (user) {
        res.status(201).json(user);
    }).catch(function (err) {
        // Error de email duplicado
        if (err.code === 11000) {
            res.status(409).json({ message: "Email already exists" });
        } else {
            res.status(500).send(err);
        }
    });
});

/* PUT - Update a user by Id */
router.put("/:id", function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(function (user) {
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send("User not found for updating");
        }
    }).catch(function (err) {
        res.status(500).send(err);
    });
});

/* DELETE - Delete a user by Id */
router.delete("/:id", function (req, res) {
    User.findByIdAndDelete(req.params.id).then(function (user) {
        if (user) {
            res.status(200).json({ message: "User successfully deleted" });
        } else {
            res.status(404).send("User not found for deletion");
        }
    }).catch(function (err) {
        res.status(500).send(err);
    });
});

module.exports = router;