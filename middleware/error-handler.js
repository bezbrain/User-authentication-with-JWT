const { StatusCode } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err,
  });
};

module.exports = errorHandlerMiddleware;
