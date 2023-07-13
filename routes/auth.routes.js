const User = require("../models/User.model");
const MonthlyBudget = require("../models/MonthlyBudget.model");
const bcrypt = require("bcryptjs");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middlewares/jwt.auth");

// SIGNUP ROUTE
router.post("/signup", async (req, res) => {
  const saltRounds = 13;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hash,
  });
  res.status(201).json(newUser);
});

// LOGIN ROUTE
router.post("/login", async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });

    if (foundUser) {
      const passwordMatch = bcrypt.compareSync(
        req.body.password,
        foundUser.password
      );
      if (passwordMatch) {
        const { _id, email } = foundUser;
        const payload = { _id, email };
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });
        console.log("here is my new token", authToken);
        res.status(200).json({ authToken });
      }
    } else {
      res.status(400).json({ errorMessage: "Invalid arguments" });
    }
  } catch (err) {
    console.log(err);
  }
});

// VERIFY ROUTE FOR PROTECTED PAGE
router.get("/verify", isAuthenticated, (req, res) => {
  if (req.payload) {
    res.status(200).json({ user: req.payload });
  }
});

// EDIT PROFILE ROUTE
router.post("/profile", isAuthenticated, async (req, res) => {
  const userId = req.payload._id;
  const newUserInfo = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      name: newUserInfo.name,
      email: newUserInfo.email,
      password: newUserInfo.password,
    },
    { new: true }
  );
});

module.exports = router;
