const { Model, DataTypes } = require("sequelize");

class Post extends Model {}

module.exports = (sequelize) => {
  Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      authorId: { // foreign key
        type: DataTypes.INTEGER,
        references: {
          model: "Authors",
          key: "id",
        },
      },
    },
    { sequelize, modelName: "Post" }
  );

  return Post;
};
