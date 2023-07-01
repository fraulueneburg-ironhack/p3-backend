const { Schema, model } = require("mongoose");

const monthlyBudgetSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "user" },
    currency: { type: String, required: true, default: "€" },
    earnings: [{ name: { type: String }, amount: { type: Number } }],
    expenses: [{ name: { type: String }, amount: { type: Number } }],
    spendingCategories: [{ type: String }]
  },
  {
    timestamps: true,
  }
);

const MonthlyBudget = model("MonthlyBudget", monthlyBudgetSchema);

module.exports = MonthlyBudget;
