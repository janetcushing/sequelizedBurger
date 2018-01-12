// =============================================================
// Dependencies
// =============================================================
var orm = require("../config/orm.js");


var burger = {
    all: function (callback) {
        orm.selectAll(function (data) {
            callback(data)
        })
    },
    create: function (values, callback) {
        orm.insertOne(values, function (data) {
            callback(data);

        });
    },
    update: function (burgerId, callback) {
        orm.updateOne(burgerId, function (data) {
            callback(data);
        });
    }
}

module.exports = burger;