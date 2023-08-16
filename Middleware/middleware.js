const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const idFromToken = decodedToken.id; // Assuming your token payload has an 'id' field
    const requestedUserId = req.params.userId; // Assuming you have the user ID in the request params

    if (idFromToken !== requestedUserId) {
      return res.status(403).json("Forbidden: You don't have permission to update this user.");
    }

    req.user = decodedToken;
    next();
  });
};

module.exports = { authenticateJWT };
