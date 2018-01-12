// *********************************************************************************
// burgers_controllers.js - this file offers a set of routes for displaying
// and saving data to the db
// *********************************************************************************

// =============================================================
// Dependencies
// =============================================================
var express = require("express");
var orm = require("../config/orm.js");
var burger = require("../models/burger");
var router = express.Router();

// =============================================================
// Routes
// =============================================================

router.get("/", function (req, res) {
    burger.all(function (data, err) {
        if (err) {
            // If an error occurred, send a generic server failure
            console.log(err);
            res.status(500).end();
        } else {
            var uneaten = [];
            var eaten = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].devoured) {
                    eaten.push(data[i])
                } else {
                    uneaten.push(data[i])
                }
            }
            res.render("index", {
                uneatenBurger: uneaten,
                eatenBurger: eaten
            });
        }
    });
});

router.get("/index", function (req, res) {
    burger.all(function (data, err) {
        if (err) {
            // If an error occurred, send a generic server failure
            console.log(err);
            res.status(500).end();
        } else {
            var uneaten = [];
            var eaten = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].devoured) {
                    eaten.push(data[i])
                } else {
                    uneaten.push(data[i])
                }
            }
            res.render("index", {
                uneatenBurger: uneaten,
                eatenBurger: eaten
            });
        }
    });
});


// add a new burger
router.post("/api/burgers", function (req, res) {
    burger.create([req.body.burger_name], function (data, err) {
        if (err) {
            // If an error occurred, send a generic server failure
            console.log(err);
            res.status(500).end();
        } else {
            res.status(200).end();
        }
    });
});

// update the devoured status
router.put("/api/devoured/:id", function (req, res) {
    // var burgerId = req.params.id;
    burger.update(req.params.id, function (data, err) {
        if (err) {
            // If an error occurred, send a generic server failure
            console.log(err);
            return res.status(500).end();
        } else if (data.changedRows == 0) {
            console.log(data);
            // If no rows were changed, then the ID must not exist, so 404
            console.log("burger row did not get updated");
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;