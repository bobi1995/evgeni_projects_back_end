const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    require: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
    require: true,
  },
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
  results: [
    {
      type: Schema.Types.ObjectId,
      ref: "Result",
    },
  ],
  userCost: {
    type: Schema.Types.ObjectId,
    ref: "UserCost",
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
});

module.exports = model("User", userSchema);
