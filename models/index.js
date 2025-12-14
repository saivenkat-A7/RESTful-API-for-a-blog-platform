const sequelize = require("../config/database");

const Author = require("./Author")(sequelize);
const Post = require("./Post")(sequelize);

// Associations
Author.hasMany(Post, { foreignKey: "authorId", onDelete: "CASCADE" });
Post.belongsTo(Author, { foreignKey: "authorId" });

module.exports = { sequelize, Author, Post };
