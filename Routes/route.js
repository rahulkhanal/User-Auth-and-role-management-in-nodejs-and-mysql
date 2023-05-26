const express = require("express");
const router = express.Router();
const { createUser, login } = require("../controllers/user");
const jwt = require("jsonwebtoken");
const path = require("path");

function authenticateToken(req, res, next) {
  // const token = req.headers.authorization;
  const token = req.cookies.token;

  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, "secret_key", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    // req.user = user;
    console.log(req);
    next();
  });
}

router.post("/register", createUser);
router.post("/login", login);
router.get("/login", (req, resp) => {
  const filePath = path.join(__dirname, "/assets/login.html");
  resp.sendFile(filePath);
});

router.get("/about", authenticateToken, (req, resp) => {
  const filePath = path.join(__dirname, "/assets/about.html");
  resp.sendFile(filePath);
});
router.get("/", authenticateToken, (req, resp) => {
  resp.send("I am Home Page");
});
router.get("/contact", authenticateToken, (req, resp) => {
  resp.send("I am Contact Page");
});
router.get("/gallery", authenticateToken, (req, resp) => {
  resp.send("I am Gallery Page");
});
router.get("/demo", authenticateToken, (req, resp) => {
  resp.send("I am Demo Page");
});
router.get("/rough", authenticateToken, (req, resp) => {
  resp.send("I am rough Page");
});

module.exports = router;
