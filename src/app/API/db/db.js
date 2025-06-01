require('dotenv').config();

const dbUrl = process.env.DB_URL;

// Example: connect to a database using dbUrl
// const mongoose = require('mongoose');
// mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = {
  dbUrl,
  // Add your db connection or query functions here
};