const MonthlyBudget = require("../models/MonthlyBudget.model");
const router = require("express").Router();
const { isAuthenticated } = require("../middlewares/jwt.auth");

// BUDGET ROUTE

router.get('/:budgetId', async (req, res) => {
  const allBudgets = await MonthlyBudget.findById(req.params.budgetId);
  res.json(allBudgets);
});

// CREATE BUDGET ROUTE

router.post("/create", isAuthenticated, async (req, res) => {
  try {
    const userId = req.payload._id;
    const newBudgetData = req.body;

    const newBudget = await MonthlyBudget.create({
      user: userId,
      currency: newBudgetData.currency,
      earnings: newBudgetData.earnings,
      expenses: newBudgetData.expenses,
    })
    res.redirect(`/${newBudget._id}`);
  } catch (err) {
    console.log(err);
  }
})

// UPDATE BUDGET ROUTE

router.post("/:budgetId/update", async (req, res) => {
  try {
    const updatedBudgetData = req.body;
    const updatedBudget = await MonthlyBudget.findByIdAndUpdate({ _id: req.params.budgetId }, {
      currency: updatedBudgetData.currency,
      earnings: updatedBudgetData.earnings,
      expenses: updatedBudgetData.expenses,
    }, { new: true });
    res.redirect(`/${updatedBudget._id}`);
  } catch (err) {
    console.log(err);
  }
})

// DELETE BUDGET ROUTE

router.post("/:budgetId/delete", async (req, res) => {
  try {
    const deletedBudget = await MonthlyBudget.findByIdAndDelete({ _id: req.params.budgetId });
    res.redirect(`/budget`);
  } catch (err) {
    console.log(err);
  }
})

module.exports = router;
