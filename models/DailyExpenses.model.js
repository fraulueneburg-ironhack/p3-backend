const { Schema, model } = require("mongoose");

const dailyExpensesSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "user" },
    date: { type: Date, required: true },
    category: { type: String, required: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true }
  },
  {
    timestamps: true,
  }
);

const DailyExpenses = model("DailyExpenses", dailyExpensesSchema);

module.exports = DailyExpenses;
