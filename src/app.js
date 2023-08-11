const express = require("express");

//? routes
const userRoutes = require("./routes/users.route");
const repairRoutes = require('./routes/repairs.route');
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/error.controller");

const app = express();
app.use(express.json());

//? base endpoints
app.use("/api/v1/users", userRoutes);
app.use('/api/v1/repairs',repairRoutes)

app.all('*', (req, res, next) => {
  return next(
    new AppError(`cant find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;