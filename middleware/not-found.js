const notFoundMiddleware = (req, res) => {
  return res
    .status(404)
    .send("<h1>This route does not exist</h1><a href='/'>Go Back Home</a>");
};

module.exports = notFoundMiddleware;
