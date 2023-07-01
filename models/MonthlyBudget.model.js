const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const monthlyBudgetSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "user" },
    currency: { type: String, required: true, default: "€" },
    earnings: [{ name: { type: String }, amount: { type: Number } }],
    expenses: [{ name: { type: String }, amount: { type: Number } }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const MonthlyBudget = model("MonthlyBudget", monthlyBudgetSchema);

module.exports = MonthlyBudget;
