const MonthlyBudget = require('../models/MonthlyBudget.model')
const DailyExpenses = require('../models/DailyExpenses.model')
const router = require('express').Router()
const { isAuthenticated } = require('../middlewares/jwt.auth')

// BUDGET ROUTE

router.get('/', isAuthenticated, async (req, res) => {
	const userId = req.payload._id
	const foundMonthlyBudget = await MonthlyBudget.find({ user: userId })
	const foundDailyExpenses = await DailyExpenses.find({ user: userId })
	res.json({ respMonthlyBudget: foundMonthlyBudget, respDailyExpenses: foundDailyExpenses })
})

// CREATE/UPDATE BUDGET ROUTE

router.post('/create', isAuthenticated, async (req, res) => {
	try {
		const userId = req.payload._id
		const newBudgetData = req.body
		const budget = await MonthlyBudget.find({ user: userId })

		if (budget === []) {
			const newBudget = await MonthlyBudget.create({
				user: userId,
				currency: newBudgetData.currency,
				earnings: newBudgetData.earnings,
				expenses: newBudgetData.expenses,
				spendingCategories: newBudgetData.spendingCategories,
			})
			res.status(201).json(newBudget)
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
			)
			res.status(201).json(updatedBudget)
		}
	} catch (err) {
		console.log(err)
	}
})

// DELETE BUDGET ROUTE

router.post('/:budgetId/delete', async (req, res) => {
	try {
		const deletedBudget = await MonthlyBudget.findByIdAndDelete({ _id: req.params.budgetId })
		res.redirect(`/budget`)
	} catch (err) {
		console.log(err)
	}
})

// ADD DAILY EXPENSE ROUTE

router.post('/addexpense', isAuthenticated, async (req, res) => {
	try {
		const userId = req.payload._id
		const dailyExpenseData = req.body
		console.log('dailyExpenseData', dailyExpenseData)
		const newDailyExpense = await DailyExpenses.create({
			date: dailyExpenseData.date,
			user: userId,
			category: dailyExpenseData.category,
			name: dailyExpenseData.name,
			amount: dailyExpenseData.amount,
		})
		console.log('newDailyExpense', newDailyExpense)
		res.status(201).json(newDailyExpense)
	} catch (err) {
		console.log(err)
	}
})

// DELETE DAILY EXPENSE ROUTE

router.post('/:dailyExpenseId/delete', async (req, res) => {
	try {
		const deletedBudget = await DailyExpenses.findByIdAndDelete({ _id: req.params.dailyExpenseId })
		res.redirect(`/budget`)
	} catch (err) {
		console.log(err)
	}
})

module.exports = router
