const MonthlyBudget = require("../models/MonthlyBudget.model");
const UserModel = require("../models/User.model");
const router = require("express").Router();
const { isAuthenticated } = require("../middlewares/jwt.auth");

// BUDGET ROUTE

router.get("/:budgetId", async (req, res) => {
  const allBudgets = await MonthlyBudget.findById(req.params.budgetId);
  res.json(allBudgets);
});

// CREATE/UPDATE BUDGET ROUTE

router.post("/create", isAuthenticated, async (req, res) => {
  try {
    const userId = req.payload._id;
    const newBudgetData = req.body;
    const budget = await MonthlyBudget.find({ user: userId });

    console.log("REQ.BODY", req.body);
    console.log("NEW BUDGET DATA", newBudgetData);

    if (budget === []) {
      const newBudget = await MonthlyBudget.create({
        user: userId,
        currency: newBudgetData.currency,
        earnings: newBudgetData.earnings,
        expenses: newBudgetData.expenses,
        spendingCategories: newBudgetData.spendingCategories,
      });
      res.status(201).json(newBudget);
    } else {
      const updatedBudget = await MonthlyBudget.findByIdAndUpdate(
        budget[0]._id,
        {
          currency: newBudgetData.currency,
          earnings: newBudgetData.earnings,
          expenses: newBudgetData.expenses,
          spendingCategories: newBudgetData.spendingCategories,
        },
        { new: true }
      );
      console.log("UPDATED BUDGET", newBudgetData);
      res.status(201).json(updatedBudget);
    }
  } catch (err) {
    console.log(err);
  }
});

// DELETE BUDGET ROUTE

router.post("/:budgetId/delete", async (req, res) => {
  try {
    const deletedBudget = await MonthlyBudget.findByIdAndDelete({
      _id: req.params.budgetId,
    });
    res.redirect(`/budget`);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
