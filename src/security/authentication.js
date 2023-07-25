require("dotenv").config();
const jwt = require("jsonwebtoken");

function signUser(id) {
  const user = { id: id };
  const token = jwt.sign(user, process.env.JWT_SECRET);
  return token;
}
function authenticateToken(req, res, next) {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = { signUser, authenticateToken };
