const { Schema, model } = require("mongoose");

const projectSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  power: { type: String },
  location: { type: String },
  offer: [{ type: String }],
  schedule: [{ type: String }],
  simulation: [{ type: String }],
  contractAssigner: [{ type: String }],
  contractSubcontractor: [{ type: String }],
  pictures: [{ type: String }],
  standpoint: [{ type: String }],
  permission: [{ type: String }],
  projectDocs: [{ type: String }],
  status: { type: Number },
  totalProfit: { type: Number },
  contractSum: { type: Number },
  type: { type: String },
  startDate: {
    type: Date,
  },
  targetDate: { type: Date },
  endDate: { type: Date },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  budget: [{ type: Schema.Types.ObjectId, ref: "RowsOfBudget" }],
});

module.exports = model("Project", projectSchema);
