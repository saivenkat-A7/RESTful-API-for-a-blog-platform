require("dotenv").config();
const express = require("express");
const db = require("./models");

const authorRoutes = require("./routes/authorRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();
app.use(express.json());

app.use("/authors", authorRoutes);
app.use("/posts", postRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await db.sequelize.authenticate();
    console.log("Database connected successfully");

    await db.sequelize.sync({ alter: true });
    console.log("Models synchronized");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1); // Stops container if DB fails
  }
}

startServer();
