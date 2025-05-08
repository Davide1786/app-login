const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Token mancante" });

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Token non valido" });
    req.user = user;
    next();
  });
}
module.exports = authenticateToken;
