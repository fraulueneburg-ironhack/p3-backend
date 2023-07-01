const { Schema, model } = require("mongoose");

const savingGoalsSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "user" },
        name: { type: String, required: true },
        amount: { type: Number, required: true },
        amountSaved: { type: Number },
        time: { type: Number, required: true },
        isReached: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

const SavingGoals = model("SavingGoals", savingGoalsSchema);

module.exports = SavingGoals;
