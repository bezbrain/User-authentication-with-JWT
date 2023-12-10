const express = require("express");
const app = express();

// Import and invoke env
require("dotenv").config();

// Initialize the req body
app.use(express.json());

// Initialize async error to hanlde async...await
require("express-async-error");

// Import auth route
const authRouter = require("./routes/auth.route");

// The dynamic port
const port = process.env.PORT || 3000;

// Import not found middleware
const notFoundMiddleware = require("./middleware/not-found");
// Import error handler middleware
const errorHandlerMiddleware = require("./middleware/error-handler");

// ROUTES
app.get("/", (req, res) => {
  res.send("<h1>This is the home page</h1>");
});
app.use("/api/v1", authRouter);

// Invoke notFound and errorHandler middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    // Start the server
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
