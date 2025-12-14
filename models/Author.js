const { Model, DataTypes } = require("sequelize");

class Author extends Model {}

module.exports = (sequelize) => {
  Author.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    { sequelize, modelName: "Author" }
  );

  return Author;
};
