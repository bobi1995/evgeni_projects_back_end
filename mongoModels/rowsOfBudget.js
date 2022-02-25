const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  position: { type: String, required: true },
  size: { type: String },
  quantity: { type: Number },
  singlePrice: { type: Number },
  agreedPrice: { type: Number },
  totalPrice: { type: Number },
  offer: [{ type: String }],
  provider: { type: String },
  invoice: [{ type: String }],
  priceWp: { type: Number },
  difference: { type: Number },
  project: { type: Schema.Types.ObjectId, ref: "Project" },
});

module.exports = model("RowsOfBudget", userSchema);
