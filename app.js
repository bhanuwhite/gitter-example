const express = require('express');
const app = express();
const myRoutes = require("./routes/routes");

//declaring routes
app.use('/home', myRoutes);

module.exports = app;
