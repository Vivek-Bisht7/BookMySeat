const admin = require("../config/firebaseAdmin");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
    
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = await admin.auth().verifyIdToken(token);

    let dbUser = await User.findOne({ firebaseUid: decodedToken.uid });

    if (!dbUser) {
      dbUser = await User.create({
        firebaseUid: decodedToken.uid,
        email: decodedToken.email,
        name: decodedToken.name,
        photoURL: decodedToken.picture,
      });
    }

    req.user = dbUser;

    next();

  } catch (error) {
    console.error("Auth error:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
