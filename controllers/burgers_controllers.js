// *********************************************************************************
// burgers_controllers.js - this file offers a set of routes for displaying
// and saving data to the db
// *********************************************************************************

// =============================================================
// Dependencies
// =============================================================
var express = require("express");
var router = express.Router();
// Requiring our models
var db = require("../models");

// =============================================================
// Routes
// =============================================================
function getBurgers(res) {
    db.Burger.findAll({
        include: [db.Customer]
    }).then(function (data, err) {
        if (err) {
            // If an error occurred, send a generic server failure
            console.log("an error occurred");
            console.log(err);
            res.status(500).end();
        } else if (data[0]) {
            // console.log("about to dump burger_name");
            // console.log("b name " + data[0].burger_name);
            // console.log("devoured " + data[0].devoured);
            console.log("data is returned");
            // console.log("custimer2: " + data[0].Customer.customer_name);
            console.log(data[0]);
            var uneaten = [];
            var eaten = [];
            // console.log("data length " + data.length);
            for (let i = 0; i < data.length; i++) {
                var burger = data[i].burger_name;
                // console.log("boiger: " + burger);
                var uneatenBurgerObject = [];
                var eatenBurgerObject = [];
                // console.log("ok then");
                // console.log(JSON.stringify(data[i]));
                if (data[i].devoured) {    
                    eatenBurgerObject = {
                        "customer_name": data[i].Customer.customer_name,
                        "id": data[i].id,
                        "burger_name": data[i].burger_name
                    }
                    eaten.push(eatenBurgerObject);
                } else {
                    uneatenBurgerObject = {
                        "customer_name": data[i].Customer.customer_name,
                        "id": data[i].id,
                        "burger_name": data[i].burger_name
                    }
                    uneaten.push(uneatenBurgerObject);
                }
                // console.log("uneatenBurgerObject: " + JSON.stringify(uneatenBurgerObject));
                console.log("UNEATEN BURGER OBHECT LOADED");
                // console.log("uneaten " + JSON.stringify(uneaten));

            }
            // console.log("here i am");
            // console.log("uneaten " + JSON.stringify(uneaten));
            // console.log("eaten " + JSON.stringify(eaten));
            // console.log("rendering");
            res.render("index", {
                uneatenBurger: uneaten,
                eatenBurger: eaten
            });
        } else {
            // no rows returned 
            console.log("no rows returned");
            res.render("index", {
                uneatenBurger: [],
                eatenBurger: []
            });
        }
    });
}

function updateBurgerTable(req, res) {
    console.log("IM IN UDPATE BURGER TABLE");
    db.Burger.update({
        devoured: true,
    }, {
        where: {
            id: req.params.id
        }
    }).then(function (data, err) {
        console.log("data: ");
        console.log(data);
        console.log("err: ");
        console.log(err);
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
}


function createCustomerRow(req, res){
    console.log("IM IN CREATE CUSTOMER ROW");
    db.Customer.create({
        customer_name: req.body.customer_name
    })
    .then(function (data, err) {
        console.log(" i just inserted into customer");
        console.log(data);
        if (err) {
            // If an error occurred, send a generic server failure
            console.log("AN error occured inserting into Customers");
            console.log(err);
            res.status(500).end();
        } else {
            console.log("data ");
            console.log(data);
            console.log("Customer ");
            console.log(data.id);
            var customer_id = data.id;
            console.log("ZCUSTOMER_ID: " + customer_id);
            createBurgerRow(req, res, customer_id);
        }
    });
}

function createBurgerRow(req, res, customer_id){
    console.log("IM IN CREATE BURGER ROW");
    console.log("ZCUSTOMER_ID: " + customer_id);
    console.log("burger_ID: " + req.body.burger_name);
    db.Burger.create({
        burger_name: req.body.burger_name,
        CustomerId: customer_id
    })
    .then(function (data, err) {  
        if (err) {
            // If an error occurred, send a generic server failure
            console.log("AN error occured inserting into Bugers");
            console.log(err);
            res.status(500).end();
        } else {
            console.log(data);
            getBurgers(res);;
        }
    });
}

router.get("/", function (req, res) {
    getBurgers(res);
});

router.get("/index", function (req, res) {
    getBurgers(res);
});

// add a new burger
router.post("/api/burgers/new", function (req, res) {
    createCustomerRow(req, res);  
});

// update the devoured status
router.put("/api/devoured/:id", function (req, res) {
    console.log("im updating the devoured burger  now");
    updateBurgerTable(req, res);
});

module.exports = router;