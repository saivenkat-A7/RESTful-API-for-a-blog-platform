const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "blogdb",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "postgres",
  {
    host: process.env.DB_HOST || "postgres", // <- Use Docker service name
    port: process.env.DB_PORT || 5432,       // <- Optional, safe to include
    dialect: "postgres",
    logging: false,                           // optional: cleaner logs
  }
);

module.exports = sequelize;
