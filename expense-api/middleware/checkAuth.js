const jwt = require("jsonwebtoken");
require("dotenv").config();

function checkAuth(req, res, next) {
  const token = req.get("access-token");
  console.log({ token });

  if (!token) {
    return res.sendStatus(403);
  }

  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log({ decoded });
    next();
  } catch (err) {
    console.log({ err });
    return res.sendStatus(403);
  }
}

module.exports = checkAuth;
