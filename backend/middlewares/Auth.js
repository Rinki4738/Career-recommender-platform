import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Expect payload to have 'id'
    req.user = { id: payload.id };
    next();
  } catch (e) {
    return res.status(401).json({
      error: e.message === "jwt expired" ? "Token expired" : "Invalid token",
    });
  }
};

export default auth;
