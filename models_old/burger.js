// =============================================================
// Dependencies
// =============================================================
// var orm = require("../config/orm.js");


// var burger = {
//     all: function (callback) {
//         orm.selectAll(function (data) {
//             callback(data)
//         })
//     },
//     create: function (values, callback) {
//         orm.insertOne(values, function (data) {
//             callback(data);

//         });
//     },
//     update: function (burgerId, callback) {
//         orm.updateOne(burgerId, function (data) {
//             callback(data);
//         });
//     }
// }

// module.exports = burger;

module.exports = function (sequelize, DataTypes) {
    var Burger = sequelize.define("burgers_seq_t", {
        burger_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,255],  
            }
        },
        devoured: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });
    return Burger;
};
