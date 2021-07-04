const jwt = require("jsonwebtoken");

//auth middleware
const auth = (req, res, next) => {
  const token = req.header("auth_token");
  if (!token) return res.status(401).json({ msg: "Acces denied!" });

  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token!" });
  }
};

module.exports = {
  auth
};
