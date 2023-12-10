const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide username and password",
    });
  }

  // Just for demo, normally id is provided by DB
  const id = Date.now();

  // Sign/encode a token: Try to keep payload small for better experience
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({
    success: true,
    message: "User Created",
    token,
  });
};

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;

  //   Check if token is available in the right structure
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  //   Verify token if actually valid
  const token = authHeader.split(" ")[1];
  try {
    // The encoded/signed token will be decoded here if verified successfully
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      message: `Hello, ${decoded.username}`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    });
  }
};

module.exports = { createUser, dashboard };
