import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  // 1️⃣ Get token from cookie
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id; // attach user id to request
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};
