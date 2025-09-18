import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const oauthSuccess = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "OAuth failed" });
  const user = req.user;
  const token = generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true, // Prevent JS access (XSS protection)
    sameSite: "strict", // CSRF protection
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.redirect("http://localhost:5173");
};
