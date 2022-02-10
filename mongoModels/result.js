const { Schema, model } = require("mongoose");

const resultSchema = new Schema({
  totalProfit: { type: Number },
  Period: { type: Number },
  project: { type: Schema.Types.ObjectId, ref: "Project" },
});

module.exports = model("Result", resultSchema);
