const express = require("express");
const app = express();

// Import and invoke env
require("dotenv").config();

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

// Invoke notFound and errorHandler middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Start the server
app.listen(port, console.log(`Server is listening on port ${port}`));
