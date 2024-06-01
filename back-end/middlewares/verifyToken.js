import jwt from "jsonwebtoken";

// Verify token
const verifyToken = async (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).json({ mesasge: "no token provided, access denied" });
  }

  try {
    const token = authToken.split(' ')[1];
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedPayload;
    next();
  } catch (err) {
    return res.status(401).json({ message: "invalid token, access denied" });
  }
}

// Verify token & admin
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) return next();
    res.status(403).json({ message: "not allowed to show data" });
  });
}

// Verify token & only user himself
const verifyTokenAndOnlyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id == req.params.id) return next();
    res.status(403).json({ message: "not allowed, only user himself" });
  });
}

export { verifyToken, verifyTokenAndAdmin, verifyTokenAndOnlyUser };