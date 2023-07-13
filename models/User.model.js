const { Schema, model } = require('mongoose')

const userSchema = new Schema(
	{
		name: {
			type: String,
		},
		email: {
			type: String,
			required: [true, 'Email is required.'],
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: [true, 'Password is required.'],
		},
		monthlyBudget: { type: Schema.Types.ObjectId, ref: 'monthlyBudget' },
		savingGoals: [{ type: Schema.Types.ObjectId, ref: 'savingGoals' }],
		dailyExpenses: [{ type: Schema.Types.ObjectId, ref: 'dailyExpenses' }],
	},
	{
		timestamps: true,
	}
)

const User = model('User', userSchema)

module.exports = User
