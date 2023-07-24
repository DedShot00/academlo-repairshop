const express = require("express");

//? routes
const userRoutes = require("./routes/users.route");
const repairRoutes = require('./routes/repairs.route')

const app = express();
app.use(express.json());

//? base endpoints
app.use("/api/v1/users", userRoutes);
app.use('/api/v1/repairs',repairRoutes)

module.exports = app;