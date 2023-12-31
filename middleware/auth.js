const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const UnauthorizeError = require("../errors/unauthorize");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  //   Check if token is available and in the right structure
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "No token provided",
    });
  }

  //   Verify token if actually valid
  const token = authHeader.split(" ")[1];

  try {
    // The encoded/signed token will be decoded here if verified successfully
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new UnauthorizeError("Not authorized to access this route");
  }
};

module.exports = authMiddleware;
