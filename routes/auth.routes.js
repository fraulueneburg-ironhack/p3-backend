const User = require("../models/User.model");
const MonthlyBudget = require("../models/MonthlyBudget.model");
const bcrypt = require("bcryptjs");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middlewares/jwt.auth");

router.post("/signup", async (req, res) => {
  const saltRounds = 13;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hash,
  });
  /*  console.log("here is our new user in the DB", newUser); */
  res.status(201).json(newUser);
});

//login route
router.post("/login", async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });

    if (foundUser) {
      const passwordMatch = bcrypt.compareSync(
        req.body.password,
        foundUser.password
      );
      // console.log("the password match! Yay!", passwordMatch);
      if (passwordMatch) {
        //take the info you want from the user without sensetive data
        const { _id, email } = foundUser;
        const payload = { _id, email };
        // Create and sign the token
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });
        console.log("here is my new token", authToken);
        res.status(200).json({ authToken });
      }
    } else {
      //if there is no email in the DB matching
      res.status(400).json({ errorMessage: "Invalid arguments" });
    }
  } catch (err) {
    console.log(err);
  }
});


// CREATE BUDGET ROUTE

router.post("/:userId/budgetSubmit", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const budgetSubmitted = req.body;
    console.log("REQ.BODY: ", budgetSubmitted)

    const user = await User.findById(userId);
    console.log("THE USER ID", user)

    const newBudget = await MonthlyBudget.create({
      user: userId,
      currency: "€",
      earnings: req.body.earnings,
      expenses: req.body.expenses,
    })
    res.redirect('/:userId/budget' + newBudget.id);
  } catch (err) {
    console.log(err);
  }
})

//this is the verify route for protected page of your app
router.get("/verify", isAuthenticated, (req, res) => {
  /* console.log("here is our payload", req.payload); */
  if (req.payload) {
    res.status(200).json({ user: req.payload });
  }
});

module.exports = router;
