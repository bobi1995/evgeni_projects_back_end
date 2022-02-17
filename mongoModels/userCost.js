const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  salary: { type: Number },
  others: [{ type: String }],
});

module.exports = model("UserCost", userSchema);
