const jwt = require("jsonwebtoken");
const { StatusCode } = require("http-status-codes");

// CREATE A USER
const createUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(StatusCode.BAD_REQUEST).json({
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

  res.status(StatusCode.CREATED).json({
    success: true,
    message: "User Created",
    token,
  });
};

// DASHBOARD FOR USERS TO ACCESS
const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(StatusCode.OK).json({
    message: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = { createUser, dashboard };
