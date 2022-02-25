const { Schema, model } = require("mongoose");

const resultSchema = new Schema({
  totalProfit: { type: Number },
  period: { type: Number },
  project: { type: Schema.Types.ObjectId, ref: "Project" },
  endDate: { type: Date },
  startDate: { type: Date },
  name: { type: String },
});

module.exports = model("Result", resultSchema);
