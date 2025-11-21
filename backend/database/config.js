// Get an instance of mysql we can use in the app
const mysql = require("mysql2");
require("dotenv").config();

// Create a 'connection pool' using the provided credentials
const poolConfig = {
  connectionLimit: 10,
  waitForConnections: true,
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  database: process.env.DB_DATABASE || "your_default_database",
};

// Only include password if it's set and not empty
if (process.env.DB_PASSWORD && process.env.DB_PASSWORD.trim() !== "") {
  poolConfig.password = process.env.DB_PASSWORD;
}

const pool = mysql.createPool(poolConfig).promise();

// Export it for use in our application
module.exports = pool;
