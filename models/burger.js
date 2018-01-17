module.exports = function (sequelize, DataTypes) {
  var Burger = sequelize.define("Burger", {
    burger_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
    // customer_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true
    // }
 });
 Burger.associate = function(models) {
  // We're saying that a Post should belong to an Author
  // A Post can't be created without an Author due to the foreign key constraint
  Burger.belongsTo(models.Customer, {
    foreignKey: {
      allowNull: true
    }
  });
};
  return Burger;
};